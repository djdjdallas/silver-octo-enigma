# SafeBaby Setup Guide

This guide will walk you through setting up SafeBaby from scratch.

## Quick Start Checklist

- [ ] Node.js 18.17+ installed
- [ ] Supabase account created
- [ ] Stripe account created
- [ ] Repository cloned
- [ ] Dependencies installed
- [ ] Environment variables configured
- [ ] Database migrated
- [ ] Sample data seeded
- [ ] Development server running

## Detailed Setup Steps

### 1. System Requirements

Ensure you have:
```bash
node --version  # Should be 18.17.0 or higher
npm --version   # Should be 9.0.0 or higher
```

### 2. Clone and Install

```bash
git clone https://github.com/yourusername/safebaby.git
cd safebaby
npm install
```

### 3. Supabase Setup

#### Create Project
1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Choose organization
4. Set project name: "safebaby"
5. Set database password (save it!)
6. Choose region closest to your users
7. Click "Create new project"

#### Get API Keys
1. Go to Settings > API
2. Copy these values:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - anon/public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - service_role key → `SUPABASE_SERVICE_ROLE_KEY` (keep secret!)

#### Run Migration
1. Go to SQL Editor in Supabase Dashboard
2. Create new query
3. Copy contents of `supabase/migrations/001_initial_schema.sql`
4. Paste and click "Run"
5. Verify tables created under "Table Editor"

#### Configure Auth
1. Go to Authentication > Providers
2. Enable Email provider
3. For Google OAuth (recommended):
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create new project or select existing
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs:
     - `https://your-project.supabase.co/auth/v1/callback`
     - `http://localhost:3000/auth/callback` (for dev)
   - Copy Client ID and Client Secret
   - Add to Supabase Google provider settings

#### Configure Email Templates (Optional)
1. Go to Authentication > Email Templates
2. Customize "Confirm signup" and "Reset password" emails
3. Use your branding

### 4. Stripe Setup

#### Create Account
1. Sign up at [stripe.com](https://stripe.com)
2. Complete business information
3. Enable test mode (toggle in top right)

#### Create Products
1. Go to Products > Add Product
2. Create Monthly Plan:
   - Name: "SafeBaby Pro - Monthly"
   - Description: "Monthly subscription"
   - Pricing: Recurring, $4.00 USD, monthly
   - Click "Save product"
   - Copy the Price ID (starts with `price_`)
3. Create Annual Plan:
   - Name: "SafeBaby Pro - Annual"
   - Description: "Annual subscription (save 20%)"
   - Pricing: Recurring, $47.00 USD, yearly
   - Click "Save product"
   - Copy the Price ID

#### Get API Keys
1. Go to Developers > API keys
2. Copy:
   - Publishable key → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Secret key → `STRIPE_SECRET_KEY`

#### Set Up Webhook (After Deployment)
1. Go to Developers > Webhooks
2. Click "Add endpoint"
3. Endpoint URL: `https://yourdomain.com/api/stripe/webhook`
4. Description: "SafeBaby subscription events"
5. Events to send:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
6. Click "Add endpoint"
7. Click "Reveal" under "Signing secret"
8. Copy to `STRIPE_WEBHOOK_SECRET`

**For local testing:**
```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login to Stripe
stripe login

# Forward webhooks to local server
stripe listen --forward-to localhost:3000/api/stripe/webhook
```

### 5. Environment Variables

Create `.env.local` file:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Stripe Product Price IDs
STRIPE_MONTHLY_PRICE_ID=price_xxxxx
STRIPE_ANNUAL_PRICE_ID=price_xxxxx

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### 6. Seed Database

```bash
npm run seed
```

This will:
- Create 25+ sample baby food products
- Generate realistic lab results
- Add contaminant data for each product

Verify in Supabase:
1. Go to Table Editor
2. Check "products" table has entries
3. Check "lab_results" table
4. Check "contaminants" table

### 7. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 8. Test Features

#### Test Product Search
1. Go to `/search`
2. Search for "Gerber"
3. Filter by category "cereal"
4. Verify products show up

#### Test Barcode Scanner
1. Go to `/scan`
2. Allow camera access
3. Scan barcode: `015000076207`
4. Should redirect to product page

Or use these test barcodes from seed data:
- 015000076207 - Gerber Oatmeal Cereal
- 015000076276 - Gerber Apple Puree
- 852697001354 - Happy Baby Oatmeal

#### Test Authentication
1. Go to `/signup`
2. Create account with test email
3. Check email for verification (in dev, check Supabase Auth logs)
4. Login at `/login`
5. Access `/dashboard`

#### Test Stripe (Test Mode)
1. Go to `/upgrade`
2. Select a plan
3. Click subscribe
4. Use test card: `4242 4242 4242 4242`
5. Exp: Any future date
6. CVC: Any 3 digits
7. Complete checkout
8. Verify subscription in dashboard

### 9. PWA Icons

Generate icons using [RealFaviconGenerator](https://realfavicongenerator.net/):

1. Upload your logo (1024x1024 recommended)
2. Download package
3. Extract icons to `public/icons/`
4. Ensure these sizes exist:
   - 72x72, 96x96, 128x128, 144x144
   - 152x152, 192x192, 384x384, 512x512

Or use this quick command with ImageMagick:
```bash
# Convert single image to all sizes
for size in 72 96 128 144 152 192 384 512; do
  convert icon.png -resize ${size}x${size} public/icons/icon-${size}x${size}.png
done
```

### 10. Verify Everything Works

Checklist:
- [ ] Homepage loads
- [ ] Products appear in search
- [ ] Barcode scanner works
- [ ] Product detail page shows lab results
- [ ] Signup/login works
- [ ] Dashboard accessible when logged in
- [ ] Favorites can be added/removed
- [ ] Upgrade page shows pricing
- [ ] Stripe checkout works (test mode)
- [ ] PWA manifest loads (check DevTools > Application)

### 11. Production Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for Vercel deployment instructions.

## Troubleshooting

### Database Issues

**Error: relation "products" does not exist**
- Run the migration SQL in Supabase SQL Editor
- Check Table Editor to verify tables exist

**Error: permission denied for table products**
- Check RLS policies are enabled
- Verify anon key is correct
- For admin operations, use service role key

### Authentication Issues

**Google OAuth not working**
- Verify redirect URIs in Google Console match exactly
- Check Supabase Google provider is enabled
- Clear browser cookies and try again

**Email verification not received**
- Check Supabase Auth logs
- In development, links appear in logs
- For production, configure SMTP settings

### Stripe Issues

**Checkout not working**
- Verify all Stripe keys are correct
- Check test mode is enabled
- Check browser console for errors

**Webhook not receiving events**
- Verify webhook URL is correct
- Check webhook signing secret matches
- Use Stripe CLI for local testing
- Check Stripe webhook logs

### Build Issues

**Module not found errors**
- Run `npm install` again
- Delete `node_modules` and `.next` folders
- Clear npm cache: `npm cache clean --force`

**PWA not working**
- Check manifest.json is valid JSON
- Verify icons exist in public/icons/
- Test in production build: `npm run build && npm start`

## Getting Help

1. Check the [README.md](README.md)
2. Search existing GitHub issues
3. Join our Discord community
4. Email support@safebaby.app

## Next Steps

Once setup is complete:

1. Customize branding (colors, logo)
2. Add real product data
3. Configure analytics
4. Set up error monitoring (Sentry)
5. Deploy to production
6. Configure custom domain
7. Test on real devices
8. Submit to app stores (optional)

Happy coding! 🚀
