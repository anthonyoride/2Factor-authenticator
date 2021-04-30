import express, { Router } from 'express'
import factorAuthenticationController from '../controllers/factorAuthenticationController'

const router = Router()
const authenticationController = new factorAuthenticationController();

router.post('/request-otp', authenticationController.createAuthCode)
router.post('/verify-otp', authenticationController.validateAuthCode)

export default router