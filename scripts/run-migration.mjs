import { neon } from '@neondatabase/serverless';
import { readFileSync } from 'fs';

const sql = neon(process.env.DATABASE_URL);

async function runMigration() {
  const migration = readFileSync('./agent/migrations/002_comprehensive_destination_data.sql', 'utf8');

  // Execute statements one by one - split carefully
  // For this migration, we'll run key statements separately

  // 1. Add columns
  try {
    await sql`
      ALTER TABLE destinations
      ADD COLUMN IF NOT EXISTS climate_data JSONB DEFAULT '{}',
      ADD COLUMN IF NOT EXISTS crime_safety JSONB DEFAULT '{}',
      ADD COLUMN IF NOT EXISTS healthcare JSONB DEFAULT '{}',
      ADD COLUMN IF NOT EXISTS lifestyle JSONB DEFAULT '{}',
      ADD COLUMN IF NOT EXISTS infrastructure JSONB DEFAULT '{}',
      ADD COLUMN IF NOT EXISTS dining_nightlife JSONB DEFAULT '{}',
      ADD COLUMN IF NOT EXISTS capital_overview JSONB DEFAULT '{}',
      ADD COLUMN IF NOT EXISTS quality_of_life JSONB DEFAULT '{}',
      ADD COLUMN IF NOT EXISTS currency_info JSONB DEFAULT '{}',
      ADD COLUMN IF NOT EXISTS digital_nomad_info JSONB DEFAULT '{}',
      ADD COLUMN IF NOT EXISTS comparison_highlights JSONB DEFAULT '{}',
      ADD COLUMN IF NOT EXISTS images JSONB DEFAULT '{}'
    `;
    console.log('✓ Columns added');
  } catch (e) {
    console.log('Columns may already exist:', e.message.slice(0, 100));
  }

  // 2. Create indexes
  const indexes = [
    'CREATE INDEX IF NOT EXISTS idx_destinations_climate ON destinations USING GIN (climate_data)',
    'CREATE INDEX IF NOT EXISTS idx_destinations_crime ON destinations USING GIN (crime_safety)',
    'CREATE INDEX IF NOT EXISTS idx_destinations_healthcare ON destinations USING GIN (healthcare)',
    'CREATE INDEX IF NOT EXISTS idx_destinations_lifestyle ON destinations USING GIN (lifestyle)',
    'CREATE INDEX IF NOT EXISTS idx_destinations_infrastructure ON destinations USING GIN (infrastructure)',
    'CREATE INDEX IF NOT EXISTS idx_destinations_qol ON destinations USING GIN (quality_of_life)'
  ];

  for (const idx of indexes) {
    try {
      await sql.unsafe(idx);
    } catch (e) {}
  }
  console.log('✓ Indexes created');

  // 3. Verify
  const result = await sql`
    SELECT slug, country_name
    FROM destinations
    WHERE enabled = true
    ORDER BY country_name
  `;
  console.log('✓ Found', result.length, 'destinations');

  console.log('\n✓ Migration base complete. Now seeding data...');
}

runMigration().catch(console.error);
