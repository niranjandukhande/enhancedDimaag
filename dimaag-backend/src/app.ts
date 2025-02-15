import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
export const app = express();
import rootRouter from "./routes/index";
import { clerkClient, requireAuth } from "@clerk/express";
app.use(cors({ origin: "*", credentials: true }));
// app.use(requireAuth());
// app.get("/", (req: Request, res: Response) => {
//   res.send("Server is up and running");
// });
app.use("/api/v1", rootRouter);
