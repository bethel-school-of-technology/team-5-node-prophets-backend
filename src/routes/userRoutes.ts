import { Router } from "express";
import {
  getAllUsers,
  createUser,
  getUserProfile,
  loginUser,
} from "../controllers/userController";

const router = Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.post("/login", loginUser);
router.get("/:id", getUserProfile);

export default router;
