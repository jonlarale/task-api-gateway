export const AppConfig = () => ({
  environment: process.env.NODE_ENV || 'development',
  project: process.env.PROJECT,
  port: +process.env.PORT,
  host: process.env.HOST,
  documentationPath: process.env.DOCUMENTATION_PATH,
  prefix: process.env.PREFIX,
  dbPassword: process.env.DATABASE_PASSWORD,
  dbUser: process.env.DATABASE_USERNAME,
  dbName: process.env.DATABASE,
  dbPort: process.env.DATABASE_PORT,
  dbHost: process.env.DATABASE_HOST,
});
