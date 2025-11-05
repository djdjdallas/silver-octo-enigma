# SafeBaby Deployment Guide

This guide covers deploying SafeBaby to production using Vercel.

## Pre-Deployment Checklist

- [ ] All features tested locally
- [ ] Database migrated in production Supabase
- [ ] Sample data seeded (optional)
- [ ] Stripe products created in live mode
- [ ] Environment variables documented
- [ ] PWA icons generated
- [ ] Domain name ready (optional)
- [ ] Analytics set up (optional)
- [ ] Error tracking configured (optional)

## Deploy to Vercel

### Step 1: Prepare Repository

```bash
# Ensure all changes are committed
git status
git add .
git commit -m "Prepare for production deployment"

# Push to GitHub
git push origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up or login
3. Click "Add New..." > "Project"
4. Import your GitHub repository
5. Configure project:
   - Framework Preset: Next.js
   - Root Directory: ./
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)

### Step 3: Configure Environment Variables

In Vercel project settings > Environment Variables, add:

**Supabase Variables:**
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGci...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGci...
```

**Stripe Variables (use LIVE keys!):**
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
STRIPE_MONTHLY_PRICE_ID=price_...
STRIPE_ANNUAL_PRICE_ID=price_...
```

**App Variables:**
```
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
NODE_ENV=production
```

**Important**:
- Use Production/Preview/Development scopes appropriately
- Never expose service role keys publicly
- Use live Stripe keys for production

### Step 4: Deploy

1. Click "Deploy"
2. Wait for build to complete (2-5 minutes)
3. Visit your deployment URL

### Step 5: Configure Custom Domain (Optional)

1. In Vercel project settings > Domains
2. Add your custom domain
3. Follow DNS configuration instructions
4. Update `NEXT_PUBLIC_APP_URL` to your custom domain
5. Redeploy

## Post-Deployment Configuration

### Update Supabase Redirect URLs

1. Go to Supabase Dashboard > Authentication > URL Configuration
2. Add to "Redirect URLs":
   ```
   https://yourdomain.com/auth/callback
   https://yourdomain.vercel.app/auth/callback
   ```

3. Add to "Site URL":
   ```
   https://yourdomain.com
   ```

### Configure Stripe Webhooks

#### Create Production Webhook

1. Go to Stripe Dashboard (disable test mode)
2. Developers > Webhooks > Add endpoint
3. Endpoint URL: `https://yourdomain.com/api/stripe/webhook`
4. Description: "SafeBaby Production Webhooks"
5. Events to send:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
6. Click "Add endpoint"
7. Copy the "Signing secret" (starts with `whsec_`)
8. Update `STRIPE_WEBHOOK_SECRET` in Vercel
9. Redeploy

#### Test Webhook

```bash
# Install Stripe CLI
brew install stripe/stripe-cli/stripe

# Login with live keys
stripe login --api-key sk_live_...

# Test webhook
stripe trigger checkout.session.completed \
  --api-key sk_live_...

# Check webhook logs in Stripe Dashboard
```

### Enable PWA Features

1. Test PWA on mobile device
2. Verify "Add to Home Screen" prompt appears
3. Test offline functionality
4. Check service worker in DevTools > Application

### Set Up Analytics (Optional)

#### PostHog

1. Sign up at [posthog.com](https://posthog.com)
2. Create project
3. Copy Project API Key
4. Add to Vercel environment variables:
   ```
   NEXT_PUBLIC_POSTHOG_KEY=phc_...
   NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
   ```
5. Redeploy

#### Google Analytics

1. Create GA4 property
2. Get Measurement ID
3. Add to environment variables
4. Add script to `app/layout.js`

### Set Up Error Tracking (Optional)

#### Sentry

1. Sign up at [sentry.io](https://sentry.io)
2. Create Next.js project
3. Follow setup instructions
4. Add DSN to environment variables:
   ```
   SENTRY_DSN=https://...@sentry.io/...
   ```
5. Install Sentry SDK:
   ```bash
   npm install @sentry/nextjs
   ```
6. Run configuration:
   ```bash
   npx @sentry/wizard -i nextjs
   ```

## Production Checklist

### Security

- [ ] HTTPS enabled (automatic with Vercel)
- [ ] Environment variables are secret
- [ ] RLS policies enabled in Supabase
- [ ] Stripe live mode enabled
- [ ] Webhook signing verified
- [ ] CORS configured properly
- [ ] Rate limiting implemented (optional)

### Performance

- [ ] Images optimized
- [ ] Lazy loading enabled
- [ ] Service worker caching works
- [ ] Lighthouse score > 90
- [ ] Core Web Vitals passing
- [ ] Mobile performance tested

### SEO

- [ ] Meta tags verified
- [ ] Sitemap accessible at /sitemap.xml
- [ ] robots.txt configured
- [ ] Open Graph tags working
- [ ] Schema.org markup added (optional)

### Functionality

- [ ] All pages load correctly
- [ ] Search works
- [ ] Barcode scanner works on mobile
- [ ] Authentication flows work
- [ ] Stripe checkout completes
- [ ] Webhooks processing correctly
- [ ] Email notifications sent (if configured)
- [ ] PWA installable on mobile

## Monitoring

### Vercel Analytics

Automatically enabled. View in:
- Vercel Dashboard > Analytics
- Real-time performance metrics
- Function execution logs

### Supabase Logs

Monitor in Supabase Dashboard:
- Database logs
- Auth logs
- API logs
- Storage logs

### Stripe Dashboard

Monitor subscriptions:
- Active subscriptions
- Failed payments
- Revenue metrics
- Webhook delivery status

## Troubleshooting

### Build Fails

**Check Vercel logs:**
1. Go to deployment
2. Click "View Function Logs"
3. Look for errors

**Common issues:**
- Missing environment variables
- Syntax errors
- Import issues
- Build timeout (increase in settings)

### Stripe Webhooks Not Working

1. Check webhook URL is correct
2. Verify signing secret matches
3. Check Stripe webhook logs for delivery errors
4. Test with Stripe CLI
5. Ensure endpoint is publicly accessible

### Authentication Issues

1. Verify redirect URLs in Supabase
2. Check OAuth credentials (Google)
3. Clear cookies and try again
4. Check email delivery (SMTP settings)

### Database Connection Issues

1. Verify Supabase URL and keys
2. Check RLS policies
3. Test with service role key
4. Check connection pooling settings

## Scaling Considerations

### Database

- Monitor Supabase database size
- Add indexes for slow queries
- Consider upgrading plan for more connections
- Enable connection pooling

### Vercel

- Pro plan for better performance
- Enable caching
- Use Edge Functions for global low-latency

### Stripe

- Monitor webhook delivery rate
- Consider idempotency keys for retries
- Set up webhook retry logic

## Backup Strategy

### Database Backups

Supabase automatically backs up:
- Daily backups (7 days retained on free plan)
- Point-in-time recovery (paid plans)

Manual backup:
```bash
# Dump database
pg_dump -h db.your-project.supabase.co \
  -U postgres -d postgres > backup.sql
```

### Code Backups

- GitHub repository (primary)
- Local clones on team machines
- Vercel keeps deployment history

## Rollback Procedure

If deployment has issues:

1. **Instant rollback in Vercel:**
   - Go to Deployments
   - Find previous working deployment
   - Click "..." > "Promote to Production"

2. **Database rollback:**
   - Use Supabase point-in-time recovery
   - Or restore from backup

3. **Verify:**
   - Test critical flows
   - Check error logs
   - Monitor user reports

## Support

After deployment:
- Monitor error tracking (Sentry)
- Check analytics for usage patterns
- Review Stripe dashboard for subscriptions
- Set up status page (e.g., status.io)
- Create support email/system

## Next Steps

1. **Marketing:**
   - Submit to app directories
   - Create blog/content
   - Social media presence

2. **Features:**
   - Gather user feedback
   - Prioritize feature requests
   - Plan sprints

3. **Optimization:**
   - A/B testing
   - Conversion optimization
   - Performance tuning

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Supabase Production](https://supabase.com/docs/guides/platform/going-into-prod)
- [Stripe Production Checklist](https://stripe.com/docs/development/checklist)

---

Congratulations on deploying SafeBaby! 🎉

For ongoing support, visit our GitHub repository or contact support@safebaby.app.
