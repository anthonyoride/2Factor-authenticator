"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbconnector_1 = __importDefault(require("../../config/dbconnector"));
const moment_1 = __importDefault(require("moment"));
class factorAuthenticationController {
    createAuthCode(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { phone_number } = req.body;
            //generate six-digit authentication code  
            const authCode = Math.floor(Math.random() * (9 * Math.pow(10, 6 - 1))) + Math.pow(10, 6 - 1);
            try {
                //save phone number and auth code
                const client = yield dbconnector_1.default.connect();
                const sql = `INSERT INTO auth_codes VALUES(${authCode}, ${phone_number})`;
                const { rows } = yield client.query(sql);
                client.release();
                console.log(authCode);
                return res.status(201).send({ success: true, message: `Authentication code sent to ${phone_number}` });
            }
            catch (error) {
                return res.status(500).send(error);
            }
        });
    }
    validateAuthCode(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { auth_code, phone_number } = req.body;
            try {
                const client = yield dbconnector_1.default.connect();
                //validate auth code
                const sql = `SELECT * FROM auth_codes WHERE code = '${auth_code}' AND phone = '${phone_number}'`;
                const { rows } = yield client.query(sql);
                client.release();
                //check if code expired
                if (moment_1.default(rows[0].created_at).diff(moment_1.default(), 'seconds') > 60) {
                    return res.status(403).send({ success: false, message: "Authentication code expired" });
                }
                return res.status(200).send({ success: true, message: "Authentication successful", data: rows });
            }
            catch (error) {
                return res.status(500).send(error);
            }
        });
    }
}
exports.default = factorAuthenticationController;
//# sourceMappingURL=factorAuthenticationController.js.map