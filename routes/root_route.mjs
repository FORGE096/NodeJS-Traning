import express from "express";
import { rootRoute, postRootRoute } from "../controllers/root_controller.mjs";

const rootRouter = express.Router();

rootRouter.get("/", rootRoute);
rootRouter.post("/", postRootRoute);

export {
    rootRouter,
}