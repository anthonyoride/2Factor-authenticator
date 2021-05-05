import express from 'express'
import pool from '../../config/dbconnector'
import moment from 'moment'

class factorAuthenticationController {

    public async createAuthCode(req: express.Request, res: express.Response) {
        
        const {phone_number} = req.body

        //generate six-digit authentication code  
        const authCode = Math.floor(Math.random() * (9 * Math.pow(10, 6 - 1))) + Math.pow(10, 6 - 1)

        try{
            //save phone number and auth code
            const client = await pool.connect()
            const sql = `INSERT INTO auth_codes VALUES(${authCode}, ${phone_number})`
            const {rows} = await client.query(sql)
            client.release()
            console.log(authCode)
            return res.status(201).send({success: true, message: `Authentication code sent to ${phone_number}`})
        }catch(error) {
            return res.status(500).send(error)
        }
    }

    public async validateAuthCode(req: express.Request, res: express.Response) {
        
        const {auth_code, phone_number} = req.body
        try{
            const client = await pool.connect()

            //validate auth code
            const sql = `SELECT * FROM auth_codes WHERE code = '${auth_code}' AND phone = '${phone_number}'`
            const {rows} = await client.query(sql)
            client.release()
            //check if code expired
            if(moment(rows[0].created_at).diff(moment(), 'seconds') > 60) {
                return res.status(403).send({success: false, message: "Authentication code expired"})
            }

            return res.status(200).send({success: true, message: "Authentication successful", data: rows})
        }catch(error) {
            return res.status(500).send(error)
        }
    }
}

export default factorAuthenticationController