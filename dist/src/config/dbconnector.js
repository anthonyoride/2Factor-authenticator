"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
exports.default = new pg_1.Pool({
    max: 20,
    connectionString: 'postgres://postgres:pass123@127.0.0.1:5432/geralddb',
    idleTimeoutMillis: 30000
});
//# sourceMappingURL=dbconnector.js.map