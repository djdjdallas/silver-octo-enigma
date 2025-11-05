# SafeBaby Database Scripts

This directory contains tools for populating and managing the SafeBaby product database.

## Quick Start

### 1. Populate Database with 500+ Products

```bash
npm run seed:enhanced
```

This will add ~550 products including:
- 23 real HBBF 2019 tested products
- 500+ expanded products covering all major brands
- Complete heavy metal test data
- Proper brand distribution (Gerber 30%, Beech-Nut 15%, etc.)

### 2. Import Products from CSV

```bash
npm run import:csv -- path/to/your-data.csv
```

Use the template at `product-data-template.csv` to add your own data.

### 3. Scrape Manufacturer Websites (when available)

```bash
npm run scrape:ab899
```

Currently disabled - will be activated when manufacturers publish AB 899 disclosures.

## Files

| File | Purpose | Lines | Status |
|------|---------|-------|--------|
| `seed-enhanced.js` | Enhanced seed with HBBF 2019 data | 800+ | Ready ✓ |
| `scrape-ab899.js` | Web scraper for AB 899 disclosures | 500+ | Ready (disabled) |
| `import-csv.js` | CSV import tool | 450+ | Ready ✓ |
| `product-data-template.csv` | CSV template for manual entry | - | Template |
| `database-expansion-guide.md` | Comprehensive guide | - | Documentation |
| `seed.js` | Original seed script (~25 products) | 350 | Legacy |

## Expected Output

### Enhanced Seed Script

```
Starting enhanced database seed with HBBF 2019 data...
============================================================

Total products to insert: 550
- HBBF tested products: 23
- Expanded products: 527

Inserting products in batches...
  Batch 1: Inserted 100 products
  Batch 2: Inserted 100 products
  ...

Successfully inserted 550 products

Inserting lab results and contaminants...
  Processed 50/550 products...
  Processed 100/550 products...
  ...

============================================================
DATABASE SEED COMPLETED SUCCESSFULLY!
============================================================
Total products inserted: 550
Lab results created: 550
Contaminants recorded: 2200

Brand distribution:
  Gerber: 150 products
  Beech-Nut: 75 products
  Happy Baby: 60 products
  Plum Organics: 50 products
  Earth's Best: 40 products
  ...

Category distribution:
  puree: 247 products
  snack: 110 products
  cereal: 82 products
  juice: 55 products
  meal: 55 products
```

## Requirements

- Node.js 18.17+
- Supabase connection configured in `.env.local`
- Dependencies: `@supabase/supabase-js`, `dotenv`

## Environment Setup

Create `.env.local` with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

## Documentation

See `database-expansion-guide.md` for:
- Complete data source information
- Data quality levels
- Expansion strategy and roadmap
- Safety score calculation details
- Best practices
- Troubleshooting

## Support

For questions or issues:
1. Check `database-expansion-guide.md`
2. Review error messages carefully
3. Verify environment variables
4. Check Supabase dashboard for data
