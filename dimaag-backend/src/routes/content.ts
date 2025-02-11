import express from "express"
import { addContent } from "../controllers/insertContentController"

const router = express.Router()

router.get("/",(req , res)=>{
    res.send({
        message: "Hello"
    })
})

router.post("/",addContent)

export default router
