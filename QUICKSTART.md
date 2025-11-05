# SafeBaby Quick Start Guide

Get SafeBaby running in under 10 minutes!

## Prerequisites

- Node.js 18.17+
- Supabase account (free)
- Stripe account (free)

## 5-Minute Setup

### 1. Clone & Install (1 min)

```bash
git clone <your-repo-url>
cd Baby-food
npm install
```

### 2. Supabase Setup (2 min)

1. Create project at [supabase.com](https://supabase.com)
2. Go to SQL Editor
3. Copy/paste content from `supabase/migrations/001_initial_schema.sql`
4. Click "Run"
5. Go to Settings > API, copy URL and keys

### 3. Stripe Setup (1 min)

1. Create account at [stripe.com](https://stripe.com)
2. Enable test mode
3. Create two products (Products > Add Product):
   - Monthly: $4/month → copy Price ID
   - Annual: $47/year → copy Price ID
4. Get API keys from Developers > API keys

### 4. Configure Environment (1 min)

Create `.env.local`:

```env
# Supabase (from Settings > API)
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key

# Stripe (from Developers > API keys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_... # Leave empty for now

# Stripe Price IDs
STRIPE_MONTHLY_PRICE_ID=price_...
STRIPE_ANNUAL_PRICE_ID=price_...

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### 5. Seed & Run (1 min)

```bash
# Add sample products
npm run seed

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Test It Out

### Try These Features:

1. **Browse Products**: Go to `/search`
2. **Scan Barcode**: Go to `/scan`, use barcode `015000076207`
3. **Create Account**: Go to `/signup`
4. **Test Checkout**:
   - Go to `/upgrade`
   - Click subscribe
   - Use card `4242 4242 4242 4242`
   - Any future date, any CVC

## Test Barcodes

From seed data:
- `015000076207` - Gerber Oatmeal Cereal
- `015000076276` - Gerber Apple Puree
- `852697001354` - Happy Baby Oatmeal
- `023923302006` - Earth's Best Multi-Grain

## What's Next?

### Essential Reading:
- [README.md](README.md) - Full documentation
- [SETUP.md](SETUP.md) - Detailed setup guide
- [DEPLOYMENT.md](DEPLOYMENT.md) - Production deployment

### Customize:
1. Change branding in `tailwind.config.js`
2. Update logo and PWA icons in `public/icons/`
3. Modify product categories in `app/search/page.js`
4. Add more seed data in `scripts/seed.js`

### Deploy:
1. Push to GitHub
2. Import to [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

## Troubleshooting

**Can't connect to database?**
- Check Supabase URL and keys in `.env.local`
- Verify migration ran successfully

**Products not showing?**
- Run `npm run seed` again
- Check Supabase Table Editor for data

**Stripe checkout not working?**
- Verify test mode is ON
- Check Price IDs are correct
- Use test card `4242 4242 4242 4242`

**Barcode scanner not working?**
- Allow camera permissions
- Try different barcode
- Check browser console for errors

## Need Help?

- Read the full [README.md](README.md)
- Check [SETUP.md](SETUP.md) for detailed instructions
- Open an issue on GitHub
- Email: support@safebaby.app

## Pro Tips

1. **Stripe Webhooks** (for local testing):
   ```bash
   stripe listen --forward-to localhost:3000/api/stripe/webhook
   ```

2. **View Database** (Supabase Studio):
   - Go to Table Editor in Supabase Dashboard
   - Browse all tables and data

3. **Check Logs**:
   - Browser console (F12)
   - Terminal where dev server runs
   - Supabase logs in dashboard

4. **Reset Everything**:
   ```bash
   # Delete all data
   # In Supabase SQL Editor, run:
   DELETE FROM contaminants;
   DELETE FROM lab_results;
   DELETE FROM products;
   DELETE FROM user_favorites;
   DELETE FROM user_profiles;

   # Reseed
   npm run seed
   ```

---

That's it! You now have a fully functional baby food safety rating app. 🎉

Next steps:
1. Explore the codebase
2. Customize for your needs
3. Deploy to production
4. Launch! 🚀
