import express from "express"
const userRouter = require("./user")
const webhookRouter = require("./webhook")
const router = express.Router()

router.use("/user",userRouter)
router.use("/webhook",webhookRouter)

module.exports = router