import { Router } from "express";
import {
  createQakReply,
  updateQakReply,
  deleteQakReply,
} from "../controllers/qakReplyController";

const router = Router();

router.post("/", createQakReply);

router.put("/edit/:qakReply_id", updateQakReply);

router.delete("/:qakReply_id", deleteQakReply);

export default router;
