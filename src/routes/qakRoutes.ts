import { Router } from "express";
import {
  getAllQaks,
  createQak,
  getQak,
  updateQak,
  deleteQak,
} from "../controllers/qakController";

const router = Router();

router.get("/", getAllQaks);

router.post("/", createQak);

router.get("/:id", getQak);

router.put("/:id", updateQak);

router.delete("/:id", deleteQak);

export default router;
