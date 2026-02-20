import { getCloudflareContext } from '@opennextjs/cloudflare';
import { drizzle, PostgresJsDatabase } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema/schema';

export type Database = PostgresJsDatabase<typeof schema>;

declare global {
    // eslint-disable-next-line no-var
    var _db: Database | undefined;
}

async function getConnectionString(): Promise<string> {
    try {
        const { env } = await getCloudflareContext({ async: true });
        if (env.HYPERDRIVE) {
            return env.HYPERDRIVE.connectionString;
        }
    } catch {
        // Cloudflare context not available
    }
    return process.env.DATABASE_URL!;
}

export async function getDb(): Promise<Database> {
    const isProduction = process.env.NODE_ENV === 'production';
    const connectionString = await getConnectionString();

    if (isProduction) {
        // Hyperdrive 在 Cloudflare 侧管理连接池，每次请求创建新实例即可
        // prepare: false 是 Hyperdrive 事务池模式的要求
        const client = postgres(connectionString, { prepare: false });
        return drizzle({ client, schema: { ...schema } });
    }

    if (!global._db) {
        const client = postgres(connectionString, { max: 1 });
        global._db = drizzle({ client, schema: { ...schema } });
    }
    return global._db;
}