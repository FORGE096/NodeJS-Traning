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

app.listen(port, () => {
    console.log(`Lisening To ${port}`);
});