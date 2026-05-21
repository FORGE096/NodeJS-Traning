import mongoose from "mongoose";

mongoose.connect("mongodb://localhost/testDB").then(() => console.log("Connected!")).catch(() => console.log("Cannot Connect"));

const userSchema = mongoose.Schema({
    name: String,
    family: String,
    age: Number,
});

const User = mongoose.model('User', userSchema);

async function createUser(name, family, age) {
    const user = new User({
        name: name,
        family: family,
        age: age,
    });
    const reslut = await user.save();
    console.log(reslut);
    return reslut;
}

export {
    createUser,
}
