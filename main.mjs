import { users } from "./models/users.mjs";
import express from "express";

const app = express();
const port = 6500;

app.use((request, response, next) => {
    console.log(`${request.method} ${request.url}`);
    next();
});
 
app.use(express.json());

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
    const user = users[id]
    if (user) {
        response.send({
            CODE: response.statusCode,
            MESSAGE: `User With ID ${id} Has Been Fetched!`,
            USER: users[id],
        });
        return;
    } else {
        response.status(404).json({
            CODE: response.statusCode,
            MESSAGE: `User Not Found With ID ${id}`,
        });
        return;
    }
});

app.post("/users", (request, response) => {
    const newUser = request.body;
    users.push(newUser);
    response.status(201).json({
        CODE: response.statusCode,
        MESSAGE: "User Created",
        USER: newUser,
        USERS: users,
    });
});

app.listen(port, () => {
    console.log(`Lisening To ${port}`);
});