import express from "express";
import contentRouter from "./content";
import userRouter from "./user";
import webHookRouter from "./webhook";

const router = express.Router();

router.use("/webhook", webHookRouter);

router.use(express.json());

router.use("/user", userRouter);

router.use("/content", contentRouter);
export default router;
