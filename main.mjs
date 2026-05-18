import { users } from "./models/users.mjs";
import express from "express";
import { getAllUsers, getUserByID, postNewUser, updateUser, deleteUser } from "./controllers/users_controller.mjs";

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

app.get("/users", getAllUsers);

app.get("/users/:id", getUserByID);

app.post("/users", postNewUser);

app.put("/users/:id", updateUser);

app.delete("/users/:id", deleteUser);

app.listen(port, () => {
    console.log(`Lisening To ${port}`);
});