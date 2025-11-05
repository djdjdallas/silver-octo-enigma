// Supabase Edge Function to check FDA recall feed and notify users
// This function should be triggered daily via a cron job

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface FDARecallItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  guid: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch FDA recall RSS feed
    const fdaRssUrl = 'https://www.fda.gov/about-fda/contact-fda/stay-informed/rss-feeds/recalls/rss.xml';
    const rssResponse = await fetch(fdaRssUrl);
    const rssText = await rssResponse.text();

    // Parse RSS feed (simplified - in production, use a proper XML parser)
    const recalls = parseRssFeed(rssText);

    // Filter for baby food related recalls
    const babyFoodRecalls = recalls.filter(recall =>
      isBabyFoodRelated(recall.title) || isBabyFoodRelated(recall.description)
    );

    console.log(`Found ${babyFoodRecalls.length} baby food recalls`);

    let newRecallsCount = 0;
    let notificationsSentCount = 0;

    // Process each recall
    for (const recall of babyFoodRecalls) {
      // Check if recall already exists
      const { data: existingRecall } = await supabase
        .from('recalls')
        .select('id')
        .eq('fda_recall_id', recall.guid)
        .single();

      if (existingRecall) {
        console.log(`Recall ${recall.guid} already exists, skipping`);
        continue;
      }

      // Try to match recall to products in database
      const matchedProducts = await matchRecallToProducts(supabase, recall);

      if (matchedProducts.length === 0) {
        console.log(`No matching products found for recall: ${recall.title}`);
        continue;
      }

      // Create recall records for each matched product
      for (const product of matchedProducts) {
        const { data: newRecall, error: recallError } = await supabase
          .from('recalls')
          .insert({
            product_id: product.id,
            fda_recall_id: recall.guid,
            recall_date: new Date(recall.pubDate).toISOString().split('T')[0],
            reason: recall.title,
            description: recall.description,
            fda_url: recall.link,
            risk_level: extractRiskLevel(recall.description),
            is_active: true,
          })
          .select()
          .single();

        if (recallError) {
          console.error('Error creating recall:', recallError);
          continue;
        }

        newRecallsCount++;

        // Find users who have this product favorited
        const { data: favorites } = await supabase
          .from('user_favorites')
          .select('user_id, users:user_id(email)')
          .eq('product_id', product.id);

        if (!favorites || favorites.length === 0) {
          console.log(`No users have favorited product ${product.name}`);
          continue;
        }

        // Send notifications to affected users
        for (const favorite of favorites) {
          // Get user notification preferences
          const { data: userProfile } = await supabase
            .from('user_profiles')
            .select('notification_email, notification_push, notification_sms, subscription_tier')
            .eq('id', favorite.user_id)
            .single();

          if (!userProfile) continue;

          // Send email notification (free tier)
          if (userProfile.notification_email) {
            await sendEmailNotification(
              favorite.users.email,
              product.name,
              recall.title,
              recall.link
            );

            // Record notification
            await supabase.from('recall_notifications').insert({
              user_id: favorite.user_id,
              recall_id: newRecall.id,
              notification_type: 'email',
            });

            notificationsSentCount++;
          }

          // Send push notification (pro tier only)
          if (userProfile.notification_push && userProfile.subscription_tier === 'pro') {
            // In production, integrate with Web Push API or service like OneSignal
            console.log(`Would send push notification to user ${favorite.user_id}`);

            await supabase.from('recall_notifications').insert({
              user_id: favorite.user_id,
              recall_id: newRecall.id,
              notification_type: 'push',
            });

            notificationsSentCount++;
          }

          // Send SMS notification (pro tier only)
          if (userProfile.notification_sms && userProfile.subscription_tier === 'pro') {
            // In production, integrate with Twilio or similar
            console.log(`Would send SMS notification to user ${favorite.user_id}`);

            await supabase.from('recall_notifications').insert({
              user_id: favorite.user_id,
              recall_id: newRecall.id,
              notification_type: 'sms',
            });

            notificationsSentCount++;
          }
        }
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `Processed ${babyFoodRecalls.length} recalls, created ${newRecallsCount} new recall records, sent ${notificationsSentCount} notifications`,
        newRecallsCount,
        notificationsSentCount,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error) {
    console.error('Error in check-recalls function:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    );
  }
});

// Helper function to parse RSS feed (simplified)
function parseRssFeed(rssText: string): FDARecallItem[] {
  const items: FDARecallItem[] = [];
  const itemRegex = /<item>([\s\S]*?)<\/item>/g;
  let match;

  while ((match = itemRegex.exec(rssText)) !== null) {
    const itemContent = match[1];

    const title = extractXmlTag(itemContent, 'title');
    const link = extractXmlTag(itemContent, 'link');
    const pubDate = extractXmlTag(itemContent, 'pubDate');
    const description = extractXmlTag(itemContent, 'description');
    const guid = extractXmlTag(itemContent, 'guid');

    if (title && link && pubDate && guid) {
      items.push({
        title: decodeHtml(title),
        link: decodeHtml(link),
        pubDate,
        description: decodeHtml(description || ''),
        guid,
      });
    }
  }

  return items;
}

function extractXmlTag(content: string, tag: string): string {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\/${tag}>`, 'i');
  const match = content.match(regex);
  return match ? match[1].trim() : '';
}

function decodeHtml(html: string): string {
  return html
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/<[^>]*>/g, ''); // Strip HTML tags
}

// Check if recall is related to baby food
function isBabyFoodRelated(text: string): boolean {
  const keywords = [
    'baby food',
    'infant',
    'formula',
    'baby cereal',
    'baby puree',
    'toddler',
    'gerber',
    'beech-nut',
    'beechnut',
    'plum organics',
    'happy baby',
    'earth\'s best',
    'sprout',
  ];

  const lowerText = text.toLowerCase();
  return keywords.some(keyword => lowerText.includes(keyword));
}

// Extract risk level from recall description
function extractRiskLevel(description: string): string {
  if (description.toLowerCase().includes('class i')) return 'Class I';
  if (description.toLowerCase().includes('class ii')) return 'Class II';
  if (description.toLowerCase().includes('class iii')) return 'Class III';
  return 'Class II'; // Default to Class II if not specified
}

// Match recall to products in database
async function matchRecallToProducts(supabase: any, recall: FDARecallItem) {
  const matchedProducts = [];

  // Search by product name keywords in recall title/description
  const keywords = extractProductKeywords(recall.title + ' ' + recall.description);

  for (const keyword of keywords) {
    const { data: products } = await supabase
      .from('products')
      .select('*')
      .or(`name.ilike.%${keyword}%,brand.ilike.%${keyword}%`)
      .limit(5);

    if (products && products.length > 0) {
      matchedProducts.push(...products);
    }
  }

  // Remove duplicates
  return Array.from(new Map(matchedProducts.map(p => [p.id, p])).values());
}

// Extract product keywords from recall text
function extractProductKeywords(text: string): string[] {
  const keywords: string[] = [];

  // Common baby food brands
  const brands = ['Gerber', 'Beech-Nut', 'Plum Organics', 'Happy Baby', 'Earth\'s Best', 'Sprout'];
  brands.forEach(brand => {
    if (text.includes(brand)) {
      keywords.push(brand);
    }
  });

  // Product types
  const types = ['puree', 'cereal', 'formula', 'snack', 'juice', 'pouch'];
  types.forEach(type => {
    if (text.toLowerCase().includes(type)) {
      keywords.push(type);
    }
  });

  return keywords;
}

// Send email notification using a service like Resend
async function sendEmailNotification(email: string, productName: string, recallReason: string, recallUrl: string) {
  // In production, integrate with Resend or similar email service
  const resendApiKey = Deno.env.get('RESEND_API_KEY');

  if (!resendApiKey) {
    console.log('RESEND_API_KEY not set, skipping email notification');
    return;
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'SafeBaby Alerts <alerts@safebaby.com>',
        to: [email],
        subject: `⚠️ Recall Alert: ${productName}`,
        html: `
          <h2>Product Recall Alert</h2>
          <p>A product you've favorited has been recalled:</p>
          <h3>${productName}</h3>
          <p><strong>Reason:</strong> ${recallReason}</p>
          <p>Please check the FDA notice for more details and stop using this product immediately.</p>
          <p><a href="${recallUrl}">View FDA Recall Notice</a></p>
          <hr>
          <p style="color: #666; font-size: 12px;">
            You're receiving this alert because you favorited this product on SafeBaby.
            <a href="${Deno.env.get('NEXT_PUBLIC_APP_URL')}/dashboard">Manage your favorites</a>
          </p>
        `,
      }),
    });

    if (!response.ok) {
      console.error('Error sending email:', await response.text());
    } else {
      console.log(`Email sent to ${email}`);
    }
  } catch (error) {
    console.error('Error sending email notification:', error);
  }
}
