import express from "express";
import { getMessage, postMessage } from "../controllers/messages_controller.mjs";

const messageRouter = express.Router();

messageRouter.post("/", postMessage);

messageRouter.get("/", getMessage);

export {
    messageRouter,
}