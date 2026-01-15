import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

async function main() {
  const result = await sql`SELECT slug, country_name FROM destinations WHERE enabled = true ORDER BY country_name`;
  console.log(JSON.stringify(result, null, 2));
}

main().catch(console.error);
