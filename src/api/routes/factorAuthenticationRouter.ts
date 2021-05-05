import express, {Router} from 'express'
import factorAuthenticationController from '../controllers/factorAuthenticationController'
import factorAuthenticationValidator from '../middlewares/validation'

const router = Router()
const authenticationController = new factorAuthenticationController()
const validator = new factorAuthenticationValidator()

router.post('/request-otp', validator.validateOTPRequest, authenticationController.createAuthCode)
router.post('/verify-otp', validator.validateOTPVerification, authenticationController.validateAuthCode)

export default router