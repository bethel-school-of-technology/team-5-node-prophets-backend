import { Router } from "express";
import {
  createQakReply,
  updateQakReply,
  deleteQakReply,
} from "../controllers/qakReplyController";

const router = Router();

router.post("/", createQakReply);

router.put("/:qakReply_id", updateQakReply);

router.delete("/:id", deleteQakReply);

export default router;
