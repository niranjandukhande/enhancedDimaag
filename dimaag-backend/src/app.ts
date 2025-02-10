import express from "express";
import cors from "cors";
import 'dotenv/config'
export const app = express();
app.use(cors({ origin: "*", credentials: true }));


const rootRouter = require("./routes/index")
app.use("/api/v1",rootRouter)



