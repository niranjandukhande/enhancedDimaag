import express from "express";
import webHookRouter from "./webhook";
import userRouter from "./user";
import contentRouter from "./content";
import { clerkMiddleware, requireAuth } from "@clerk/express";

const router = express.Router();

router.use("/webhook", webHookRouter);

router.use(express.json());

router.use("/user", userRouter);
router.use(clerkMiddleware());
router.use("/content", contentRouter);
export default router;
