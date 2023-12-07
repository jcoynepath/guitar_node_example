import pg from 'pg';

const { Pool } = pg;

export const dbPool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'guitars',
  password: 'guitars',
  port: 5432,
  idle_in_transaction_session_timeout: 1000,
  statement_timeout: 1000,
  max: 10,
});
