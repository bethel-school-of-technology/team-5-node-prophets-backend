import { Router } from "express";
import {
  getAllUsers,
  createUser,
  getUserProfile,
  loginUser,
  getUserQaks,
  updateUserProfile,
} from "../controllers/userController";

const router = Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.post("/login", loginUser);
router.get("/:id", getUserProfile);
router.get("/qaks/:id", getUserQaks);
router.put("/:id", updateUserProfile);

export default router;
