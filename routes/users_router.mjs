import express from "express";
import { getAllUsers, getUserByID, postNewUser, updateUser, deleteUser, getUserImage } from "../controllers/users_controller.mjs";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);

userRouter.get("/:id", getUserByID);

userRouter.post("/", postNewUser);

userRouter.put("/:id", updateUser);

userRouter.delete("/:id", deleteUser);

userRouter.get("/image/:id", getUserImage);

export {
    userRouter,
}