import express, { Router } from 'express'
import factorAuthenticationController from '../controllers/factorAuthenticationController'

const router = Router()
const authenticationController = new factorAuthenticationController();

router.post('/generate-code', authenticationController.createAuthCode)
router.post('/verify-code', authenticationController.validateAuthCode)

export default router