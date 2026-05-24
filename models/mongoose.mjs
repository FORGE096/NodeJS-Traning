import mongoose from "mongoose";

mongoose.connect("mongodb://localhost/testDB").then(() => console.log("Connected!")).catch(() => console.log("Cannot Connect"));

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
    },
    family: {
        type: String,
        required: true,
    },
    codeMelli: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return v.length === 10;
            },
            message: 'Code Melli Length Should Be 10'
        }
    },
    age: {
        type: Number,
        required: true,
        min: 5,
        max: 99
    },
});

const User = mongoose.model('User', userSchema);

async function createUser(name, family, age, codeMelli) {
    const user = new User({
        name: name,
        family: family,
        codeMelli: codeMelli,
        age: age,
    });
    const reslut = await user.save();
    console.log(reslut);
    return reslut;
}

async function getUser(name) {
    const user = await User
        .find({ name: name })
        .select({ name: 1, family: 1, _id: 0 });

    if (user.length === 1 || user.length > 0) {
        return user;
    } else {
        return false;
    }
}

async function getUserByQuery(name, codeMelli) {
    const user = await User
        .find({ name: name, codeMelli: { $eq: codeMelli } })
        .select({ name: 1, family: 1, codeMelli: 1, _id: 0 });

    if (user.length === 1 || user.length > 0) {
        return user;
    } else {
        return false;
    }
}

async function updateUserInDB(codeMelli, newName, newFamily) {

    const result = await User.updateOne({ codeMelli: codeMelli }, {
        $set: {
            name: newName,
            family: newFamily,
        }
    });

    console.log(result);
    return result;
}

export {
    createUser,
    getUserByQuery,
    getUser,
    updateUserInDB,
}
