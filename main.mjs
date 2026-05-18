import { users } from "./models/users.mjs";
import express from "express";

const app = express();
const port = 6500;

app.get("/", (request, response) => {
    response.send({
        CODE: response.statusCode,
        MESSAGE: "All Done!",
    });
});

app.get("/users", (request, response) => {
    response.send({
        CODE: response.statusCode,
        MESSAGE: "Users List Fetched",
        USERS: users,
    });
});

app.get("/users/:id", (request, response) => {
    const id = request.params.id;
    response.send({
        CODE: response.statusCode,
        MESSAGE: `User With ID ${id} Has Been Fetched!`,
        USER: users[id],
    });
});

app.listen(port, () => {
    console.log(`Lisening To ${port}`);
});