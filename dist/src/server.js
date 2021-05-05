"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const factorAuthenticationRouter_1 = __importDefault(require("./api/routes/factorAuthenticationRouter"));
const dbconnector_1 = __importDefault(require("./config/dbconnector"));
class Server {
    constructor() {
        this.start = (port) => {
            return new Promise((resolve, reject) => {
                this.app.listen(port, () => {
                    resolve(port);
                }).on('error', (err) => reject(err));
            });
        };
        this.app = express_1.default();
        this.config();
        this.routerConfig();
        this.dbConnect();
    }
    config() {
        this.app.use(body_parser_1.default.urlencoded({ extended: true }));
        this.app.use(body_parser_1.default.json({ limit: '1mb' }));
        this.app.use(cors_1.default());
    }
    dbConnect() {
        dbconnector_1.default.connect(function (err, client, done) {
            if (err)
                throw new Error(err);
            console.log('Connected');
        });
    }
    routerConfig() {
        this.app.use('/gerald-app/api/v1', factorAuthenticationRouter_1.default);
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map