"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
class factorAuthenticationValidator {
    validateOTPRequest(req, res, next) {
        const schema = joi_1.default.object().keys({
            phone_number: joi_1.default.number().integer().required()
        });
        let { error } = schema.validate(req.body);
        if (error) {
            return res.status(403).send({ success: false, errors: error });
        }
        next();
    }
    validateOTPVerification(req, res, next) {
        const schema = joi_1.default.object().keys({
            phone_number: joi_1.default.number().integer().required(),
            auth_code: joi_1.default.number().integer().required()
        });
        let { error } = schema.validate(req.body);
        if (error) {
            return res.status(403).send({ success: false, errors: error });
        }
        next();
    }
}
exports.default = factorAuthenticationValidator;
//# sourceMappingURL=validation.js.map