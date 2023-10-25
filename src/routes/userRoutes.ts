import { Router } from "express";
import {
  getAllUsers,
  createUser,
  getUserProfile,
  loginUser,
  getUserQaks,
  getOneProfile,
  updateProfile
} from "../controllers/userController";

const router = Router();

router.get("/", getAllUsers);
router.post("/", createUser);
router.post("/login", loginUser);
router.get("/:id", getUserProfile);
router.get("/:id", getOneProfile);
router.get("/qaks/:id", getUserQaks);
router.put("/:user_id", updateProfile);

export default router;
