import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    dialect: 'mysql',
    schema: './src/participant.schema.ts',
    out: './drizzle',
    verbose: true,
    dbCredentials: {
        host: process.env.MYSQL_HOST!,
        port: Number(process.env.MYSQL_PORT),
        user: 'root',
        password: process.env.MYSQL_ROOT_PASSWORD,
        database: process.env.DB_NAME!,
    },
});
