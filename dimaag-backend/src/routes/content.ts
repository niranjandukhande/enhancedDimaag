import express from "express";
import { addContent, getContent } from "../controllers/contentController";
import { verifyClerkSession } from "../middleware/verifyClerk";

const router = express.Router();

router.post("/", verifyClerkSession, addContent);
router.get("/", verifyClerkSession, getContent);
export default router;
