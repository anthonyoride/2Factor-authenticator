import { Pool } from 'pg';

export default new Pool ({
    max: 20,
    connectionString: 'postgres://postgres:pass123@127.0.0.1:5432/geralddb',
    idleTimeoutMillis: 30000
});