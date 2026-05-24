import { users } from "../models/users.mjs";
import path from "path";
import { fileURLToPath } from "url";
import { createUser, getUser, getUserByQuery, updateUserInDB } from "../models/mongoose.mjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getAllUsers(request, response) {
    response.send({
        CODE: response.statusCode,
        MESSAGE: "Users List Fetched",
        USERS: users,
    });
}

async function getUserByID(request, response) {
    const name = request.params.name;
    const isUserExist = await getUser(name);
    if (isUserExist) {
        response.send({
            CODE: response.statusCode,
            MESSAGE: `User With Name ${name} Has Been Fetched!`,
            USER: isUserExist,
        });
    } else {
        response.status(404).json({
            CODE: response.statusCode,
            MESSAGE: `User Not Found With Name ${name}`,
        });
    }
}

async function postNewUser(request, response) {
    const { name, family, age, codeMelli } = request.body;

    try {
        const newUser = await createUser(name, family, age, codeMelli);

        response.status(201).json({
            CODE: response.statusCode,
            MESSAGE: "User Created",
            USER: newUser,
        });

    } catch (error) {
        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map(err => err.message);
            return response.status(400).json({
                CODE: response.statusCode,
                MESSAGE: "Validation Error",
                ERRORS: messages,
            });
        }

        return response.status(500).json({
            CODE: response.statusCode,
            MESSAGE: "Internal Server Error",
            ERROR: error.message,
        });
    }
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

async function getUserBySearch(request, response) {
    const { name, codeMelli } = request.query;

    if (!name || !codeMelli) {
        return response.status(400).json({
            CODE: response.statusCode,
            MESSAGE: "Both 'name' and 'codeMelli' are required"
        });
    }

    try {
        const user = await getUserByQuery(name, codeMelli);
        if (user) {
            response.json({ CODE: response.statusCode, USER: user });
        } else {
            response.status(404).json({ CODE: response.statusCode, MESSAGE: "User not found" });
        }
    } catch (error) {
        response.status(500).json({ CODE: response.statusCode, MESSAGE: error.message });
    }
}

async function updateUserByQuery(request, response) {

    const { name, newName, newFamily, codeMelli } = request.body;

    if (!newName || !newFamily || !codeMelli) {
        return response.status(400).json({
            CODE: response.statusCode,
            MESSAGE: "Both 'name' and 'family' are required"
        });
    }

    try {
        const user = await getUserByQuery(name, codeMelli);
        if (user) {
            try {
                const updateResult = await updateUserInDB(codeMelli, newName, newFamily);
                if (updateResult.matchedCount > 0) {
                    return response.status(200).json({
                        CODE: response.statusCode,
                        MESSAGE: "User Updated!",
                        NEWUSER: updateResult,
                    });
                } else {
                    return response.status(404).json({
                        CODE: response.statusCode,
                        MESSAGE: "User Not Found with that codeMelli!",
                    });
                }
            } catch (error) {
                return response.status(500).json({
                    CODE: response.statusCode,
                    MESSAGE: error.message,
                });
            }
        } else {
            return response.status(404).json({
                CODE: response.statusCode,
                MESSAGE: "User Not Found with given name and codeMelli!",
            });
        }
    } catch (error) {
        return response.status(500).json({
            CODE: response.statusCode,
            MESSAGE: error.message,
        });
    }
}

export {
    getAllUsers,
    getUserByID,
    postNewUser,
    updateUser,
    deleteUser,
    getUserImage,
    getUserBySearch,
    updateUserByQuery,
}; 