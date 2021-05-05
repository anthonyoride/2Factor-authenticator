"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const factorAuthenticationController_1 = __importDefault(require("../controllers/factorAuthenticationController"));
const validation_1 = __importDefault(require("../middlewares/validation"));
const router = express_1.Router();
const authenticationController = new factorAuthenticationController_1.default();
const validator = new validation_1.default();
router.post('/request-otp', validator.validateOTPRequest, authenticationController.createAuthCode);
router.post('/verify-otp', validator.validateOTPVerification, authenticationController.validateAuthCode);
exports.default = router;
//# sourceMappingURL=factorAuthenticationRouter.js.map