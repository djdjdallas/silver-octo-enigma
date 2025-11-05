# SafeBaby - Baby Food Safety Rating App

SafeBaby is a production-ready Progressive Web App (PWA) that helps parents scan baby food products and view safety ratings based on independent laboratory testing for heavy metals (arsenic, lead, cadmium, mercury).

## Features

### Core Features
- **Barcode Scanning**: Camera-based barcode scanning using HTML5 APIs
- **Product Search**: Search and filter 300+ baby food products
- **Lab Results**: Free access to detailed contaminant data from independent labs
- **Safety Scores**: Pro users get overall 0-100 safety ratings
- **Freemium Model**: Free lab data, paid safety scores and rankings
- **PWA Support**: Installable app with offline capabilities
- **User Accounts**: Authentication with email/password and Google OAuth
- **Favorites**: Bookmark products for quick access
- **Subscription Management**: Stripe-powered monthly/annual subscriptions

### Technical Features
- Next.js 15 with App Router (JavaScript)
- Supabase (PostgreSQL + Auth)
- Stripe subscriptions
- Mobile-first responsive design
- SEO optimized with dynamic metadata
- Row Level Security (RLS)
- Progressive Web App with service workers

## Tech Stack

- **Frontend**: Next.js 15, React 18, Tailwind CSS
- **UI Components**: shadcn/ui components
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Payments**: Stripe
- **PWA**: next-pwa
- **Barcode Scanning**: html5-qrcode
- **Deployment**: Vercel-ready

## Getting Started

### Prerequisites

- Node.js 18.17 or higher
- npm or yarn
- Supabase account
- Stripe account
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/safebaby.git
cd safebaby
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Stripe Price IDs (create in Stripe Dashboard)
STRIPE_MONTHLY_PRICE_ID=price_xxx_monthly
STRIPE_ANNUAL_PRICE_ID=price_xxx_annual

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### Database Setup

1. **Create a Supabase project** at [supabase.com](https://supabase.com)

2. **Run the database migration**
   - Go to Supabase Dashboard > SQL Editor
   - Copy and paste the contents of `supabase/migrations/001_initial_schema.sql`
   - Click "Run" to execute the migration

3. **Configure Authentication**
   - Go to Authentication > Providers
   - Enable Email provider
   - Enable Google OAuth (optional but recommended)
     - Add OAuth credentials from Google Cloud Console
     - Configure redirect URLs

### Stripe Setup

1. **Create products in Stripe Dashboard**
   - Go to Products > Add Product
   - Create two products:
     - Monthly subscription: $4/month
     - Annual subscription: $47/year
   - Copy the Price IDs and add them to `.env.local`

2. **Set up webhook endpoint**
   - Go to Developers > Webhooks
   - Add endpoint: `https://yourdomain.com/api/stripe/webhook`
   - Select events to listen for:
     - `checkout.session.completed`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`
     - `invoice.payment_succeeded`
     - `invoice.payment_failed`
   - Copy the webhook signing secret to `.env.local`

### Seed Database

Populate the database with sample products:

```bash
npm run seed
```

This will add 25+ sample baby food products with realistic lab results and contaminant data.

### Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
safebaby/
├── app/                      # Next.js 15 App Router
│   ├── api/                  # API routes
│   │   └── stripe/           # Stripe integration
│   ├── auth/                 # Auth callback
│   ├── dashboard/            # User dashboard
│   ├── login/                # Login page
│   ├── product/[id]/         # Product detail pages
│   ├── scan/                 # Barcode scanner
│   ├── search/               # Product search
│   ├── signup/               # Sign up page
│   ├── upgrade/              # Pricing page
│   ├── layout.js             # Root layout
│   ├── page.js               # Homepage
│   ├── globals.css           # Global styles
│   └── sitemap.js            # Dynamic sitemap
├── components/               # React components
│   ├── ui/                   # Base UI components
│   ├── BarcodeScanner.jsx    # Scanner component
│   ├── ContaminantCard.jsx   # Contaminant display
│   ├── InstallPrompt.jsx     # PWA install prompt
│   ├── Navigation.jsx        # Main navigation
│   ├── ProductCard.jsx       # Product card
│   ├── ScoreDisplay.jsx      # Score with paywall
│   └── UpgradeBanner.jsx     # Upgrade CTA banner
├── lib/                      # Utility libraries
│   ├── supabase/             # Supabase clients
│   ├── stripe.js             # Stripe helpers
│   └── utils.js              # Helper functions
├── public/                   # Static assets
│   ├── icons/                # PWA icons
│   ├── manifest.json         # PWA manifest
│   └── robots.txt            # SEO robots file
├── scripts/                  # Utility scripts
│   └── seed.js               # Database seeding
├── supabase/                 # Supabase config
│   └── migrations/           # SQL migrations
├── .env.example              # Environment variables template
├── .gitignore
├── jsconfig.json             # JavaScript config
├── middleware.js             # Next.js middleware
├── next.config.js            # Next.js config
├── package.json
├── postcss.config.js
├── README.md
└── tailwind.config.js
```

## Key Components

### BarcodeScanner
Camera-based barcode scanner using `html5-qrcode` library. Supports UPC, EAN, and QR codes.

### ProductCard
Reusable product card that shows/hides scores based on user tier (free vs pro).

### ScoreDisplay
Displays overall safety score with a paywall overlay for free users.

### ContaminantCard
Shows individual contaminant data (always free) with visual indicators for exceeding limits.

### Navigation
Responsive navigation with mobile menu, authentication state, and upgrade CTA.

## Database Schema

### Tables

- **user_profiles**: Extended user data with subscription info
- **products**: Baby food products
- **lab_results**: Laboratory test results
- **contaminants**: Heavy metal contaminants per lab result
- **user_favorites**: User bookmarked products
- **recently_viewed**: Recently viewed products

### Row Level Security (RLS)

- Products, lab results, and contaminants are publicly readable (freemium model)
- Users can only manage their own favorites and profiles
- Service role bypasses RLS for admin operations

## Deployment

### Deploy to Vercel

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your repository
   - Add environment variables from `.env.local`
   - Deploy

3. **Configure Stripe Webhook**
   - Update Stripe webhook URL to your production domain
   - Test webhook with Stripe CLI

4. **Update Supabase Redirect URLs**
   - Go to Authentication > URL Configuration
   - Add your production domain to allowed redirect URLs

### PWA Icons

Generate PWA icons in multiple sizes (72x72 to 512x512) and place them in `public/icons/`:

- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

Use a tool like [PWA Asset Generator](https://github.com/elegantapp/pwa-asset-generator) or [RealFaviconGenerator](https://realfavicongenerator.net/).

## Environment Variables

See `.env.example` for all required environment variables.

**Required:**
- Supabase URL and keys
- Stripe keys and price IDs
- App URL

**Optional:**
- Analytics (PostHog, Plausible)
- Error tracking (Sentry)

## Testing

### Test Barcode Scanner
Use these test UPCs from the seed data:
- 015000076207 (Gerber Oatmeal Cereal)
- 015000076276 (Gerber Apple Puree)
- 852697001354 (Happy Baby Oatmeal)

### Test Stripe Checkout
Use Stripe test cards:
- Success: 4242 4242 4242 4242
- Decline: 4000 0000 0000 0002

## Security

- All secrets are environment variables
- Row Level Security enabled on all tables
- HTTPS enforced in production
- Input validation and sanitization
- CSRF protection via Next.js
- Secure headers configured
- Rate limiting recommended for production

## Performance

- Image optimization with Next.js Image
- Dynamic imports for code splitting
- PWA caching for offline support
- Database indexes on key columns
- Lazy loading for images and components

## SEO

- Dynamic metadata per page
- Open Graph tags
- Twitter Card support
- Dynamic sitemap
- robots.txt configured
- Structured data (JSON-LD) ready

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- iOS Safari 14+
- Android Chrome 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Open an issue on GitHub
- Email: support@safebaby.app

## Roadmap

- [ ] Push notifications for new test results
- [ ] Product request system
- [ ] Comparison tool
- [ ] Export reports to PDF
- [ ] Multi-language support
- [ ] Mobile apps (React Native)
- [ ] Batch barcode scanning
- [ ] Shopping list feature

## Credits

Lab testing data sourced from:
- Healthy Babies Bright Futures (HBBF)
- Consumer Reports
- EPA and FDA public reports

## Disclaimer

SafeBaby provides information from independent laboratory tests. This information is for educational purposes only and should not replace professional medical advice. Always consult with your pediatrician about your baby's nutrition and health.

---

Built with ❤️ for parents who want the best for their babies.
# silver-octo-enigma
# silver-octo-enigma
