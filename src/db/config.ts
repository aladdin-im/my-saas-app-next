import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

// 明确指定加载 .env.local
config({ path: '.env.local' });

export default defineConfig({
    schema: './src/db/schema',
    out: './src/db/migrations',
    dialect: 'postgresql',
    dbCredentials: {
        url: process.env.DATABASE_URL!,
    },
})