import express from "express";
import { getUsers, createUser, deleteUser, getUsersById, updateUserById } from "../controllers/userController.js";

const router = express.Router();

router.get("/users", getUsers);
router.post("/users", createUser);
router.delete("/users/:id", deleteUser);
router.get("/users/:id", getUsersById);
router.put("/users/:id", updateUserById);

export default router;
