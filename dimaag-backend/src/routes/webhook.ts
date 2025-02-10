import express from "express"
import { Webhook } from "svix";
import { userWebhook } from "../controllers/webHookController";
var bodyParser = require("body-parser")

const router = express.Router()

router.get("/test",(req , res)=>{
    res.send({
        message: "Hello"
    })
})

router.post('/', bodyParser.raw({ type: 'application/json' }),userWebhook)

module.exports = router