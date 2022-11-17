import express from "express";
import {
  createUser,
  login,
  updateUser,
  validateToken,
} from "../controllers/user.js";
import { protect } from "../middlewares/authMiddleware.js";
const userRouter = express.Router();

userRouter.post("/create", createUser);
userRouter.post("/login", login);
userRouter.post("/validate", validateToken);
userRouter.patch("/update", protect, updateUser);

export default userRouter;
