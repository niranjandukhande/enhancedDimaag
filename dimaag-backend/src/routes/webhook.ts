import express from "express";
import { userWebhook } from "../controllers/webHookController";
var bodyParser = require("body-parser");

const router = express.Router();

router.post("/user", bodyParser.raw({ type: "application/json" }), userWebhook);

export default router;
