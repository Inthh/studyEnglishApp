import dotenv from 'dotenv';

dotenv.config({ path: '../.env' });
export const TOPICS_PAGE_SIZE = 6;

export const GOOGLE_MAILER_CLIENT_ID = process.env.GOOGLE_MAILER_CLIENT_ID || '';
export const GOOGLE_MAILER_CLIENT_SECRET = process.env.GOOGLE_MAILER_CLIENT_SECRET || '';
export const GOOGLE_MAILER_REFRESH_TOKEN = process.env.GOOGLE_MAILER_REFRESH_TOKEN || '';
export const ADMIN_EMAIL_ADDRESS = process.env.ADMIN_EMAIL_ADDRESS || '';

export const DB_NAME = process.env.DB_NAME || '';
export const DB_USERNAME = process.env.DB_USERNAME || '';
export const DB_PASSWORD = process.env.DB_PASSWORD || '';
export const DB_HOSTNAME = process.env.DB_HOSTNAME || '';
export const DB_DBMS = process.env.DB_DBMS || '';

export const SALT_ROUNDS = 10;