import { Router } from "express";
import {
  getAllUsers,
  createUser,
  getUserProfile,
  loginUser,
  getUserQaks
} from "../controllers/userController";

const router = Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.post("/login", loginUser);
router.get("/:id", getUserProfile);
router.get("/qaks/:id", getUserQaks);

export default router;
