// Script to run database migrations
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function runMigration(migrationFile) {
  console.log(`Running migration: ${migrationFile}...\n`);

  try {
    // Read the migration file
    const migrationPath = path.join(__dirname, '..', 'supabase', 'migrations', migrationFile);
    const sql = fs.readFileSync(migrationPath, 'utf8');

    // Execute the SQL
    // Note: Supabase JS client doesn't support raw SQL execution with service role
    // We need to use the Postgres connection or REST API
    const { data, error } = await supabase.rpc('exec_sql', { sql_string: sql });

    if (error) {
      console.error('Migration failed:', error);
      throw error;
    }

    console.log('✅ Migration completed successfully!');
    return true;
  } catch (error) {
    console.error('Error running migration:', error.message);

    if (error.code === '42883') {
      console.log('\n⚠️  The exec_sql function does not exist.');
      console.log('Please run this migration manually using one of these methods:');
      console.log('1. Copy the SQL from supabase/migrations/' + migrationFile);
      console.log('2. Run it in the Supabase SQL Editor (https://supabase.com/dashboard)');
      console.log('3. Or use the Supabase CLI: npx supabase db push');
    }

    return false;
  }
}

// Get migration file from command line argument
const migrationFile = process.argv[2] || '004_ai_usage_tracking.sql';

runMigration(migrationFile)
  .then(() => {
    console.log('\nDone!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed:', error);
    process.exit(1);
  });
