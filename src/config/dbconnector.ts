import { Pool } from 'pg';

export default new Pool ({
    max: 20,
    connectionString: 'postgres://user:pass123@hostname:port/geralddb',
    idleTimeoutMillis: 30000
});