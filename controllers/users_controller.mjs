import { users } from "../models/users.mjs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getAllUsers(request, response) {
    response.send({
        CODE: response.statusCode,
        MESSAGE: "Users List Fetched",
        USERS: users,
    });
}

function getUserByID(request, response) {
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
}

function postNewUser(request, response) {
    const newUser = request.body;
    users.push(newUser);
    response.status(201).json({
        CODE: response.statusCode,
        MESSAGE: "User Created",
        USER: newUser,
        USERS: users,
    });
}

function updateUser(request, response) {
    var user = users[request.params.id];

    if (!user) {
        return response.status(404).json({
            CODE: response.statusCode,
            MESSAGE: `User With ID ${user} Not Found`,
        });
    }
    if (!request.body.name) {
        return response.status(404).json({
            CODE: response.statusCode,
            MESSAGE: `User With ID ${user} Not Found`,
        });
    }

    user.name = request.body.name;
    user.skill = request.body.skill ?? "None";
    response.send({
        CODE: response.statusCode,
        user: user,
        USERS: users,
    });
}

function deleteUser(request, response) {
    const user = users.find(user => user.id === parseInt(request.params.id));

    if (!user) {
        console.log(user);
        return response.status(404).json({
            CODE: response.statusCode,
            MESSAGE: "User Not Found!",
        });
    }

    const deletedUser = users.splice(user, 1);

    response.send({
        CODE: response.statusCode,
        MESSAGE: "Done! User Deleted!",
        USER: deletedUser,
    });
}

function getUserImage(request, response) {
    const imgPath = path.join(__dirname, "..", "public", "images", "man.png");
    const user = users.find(user => user.id === parseInt(request.params.id));
    console.log(user);
    if (!user) {
        return response.status(404).json({
            CODE: response.statusCode,
            MESSAGE: `User With ID ${request.params.id} Not Found`,
        });
    } else {
        response.sendFile(imgPath);
    }
}

export {
    getAllUsers,
    getUserByID,
    postNewUser,
    updateUser,
    deleteUser,
    getUserImage,
};