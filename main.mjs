import { users } from "./models/users.mjs";
import express from "express";
import { userRouter } from "./routes/users_router.mjs";
import { messageRouter } from "./routes/messages_router.mjs";
import { rootRouter } from "./routes/root_route.mjs";
const app = express();
const port = 6500;

app.use((request, response, next) => {
    console.log(`${request.method} ${request.url}`);
    next();
});

app.use(express.json());

app.use("/", rootRouter);

app.use("/message", messageRouter);

app.use("/users", userRouter);

app.listen(port, () => {
    console.log(`Lisening To ${port}`);
});