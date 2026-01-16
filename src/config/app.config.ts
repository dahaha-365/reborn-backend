export default () => ({
  app: {
    port: parseInt(process.env.APP_PORT as string, 10) || 4000,
    host: process.env.APP_HOST || '0.0.0.0',
    env: process.env.NODE_ENV || 'development',
  },
  database: {
    url:
      process.env.DATABASE_URL ||
      'postgresql://postgres:postgres@127.0.0.1:5432/reborn?schema=public',
  },
});
