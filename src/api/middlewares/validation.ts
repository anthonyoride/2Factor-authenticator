import express from 'express'
import Joi from 'joi'

class factorAuthenticationValidator {
    public validateOTPRequest (req: express.Request, res: express.Response, next: express.NextFunction) {
        const schema = Joi.object().keys({
            phone_number: Joi.number().integer().required()
        })

        let {error} = schema.validate(req.body)
        if(error) {
            return res.status(403).send({success: false, errors: error})
        }
        next()
    }

    public validateOTPVerification (req: express.Request, res: express.Response, next: express.NextFunction) {
        const schema = Joi.object().keys({
            phone_number: Joi.number().integer().required(),
            auth_code: Joi.number().integer().required()
        })
        
        let {error} = schema.validate(req.body)
        if(error) {
            return res.status(403).send({success: false, errors: error})
        }
        next()
    }
}

export default factorAuthenticationValidator