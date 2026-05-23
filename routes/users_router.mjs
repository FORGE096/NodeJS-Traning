import express from "express";
import { getAllUsers, getUserByID, postNewUser, updateUser, deleteUser, getUserImage, getUserBySearch, updateUserByQuery } from "../controllers/users_controller.mjs";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/search", getUserBySearch);
userRouter.post("/update", updateUserByQuery);
userRouter.get("/image/:id", getUserImage);

userRouter.get("/:name", getUserByID);

userRouter.post("/", postNewUser);
userRouter.put("/:id", updateUser);
userRouter.delete("/:id", deleteUser);

export {
    userRouter,
}