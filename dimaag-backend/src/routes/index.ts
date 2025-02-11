import express from "express"
const userRouter = require("./user")
const webhookRouter = require("./webhook")
import contentRouter from "./content"

const router = express.Router()

router.use("/webhook",webhookRouter)

router.use(express.json())
router.use("/user",userRouter)
router.use("/contetn",contentRouter)
module.exports = router