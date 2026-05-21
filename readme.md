# NodeJS Training

This repository just for test. my own NodeJS Traning. currently im watching an online course about NodeJs/ExpressJS so im using this repository just for my training :D

## Transferring Files With ExpressJS

Well, that's great. Now I've reached the transfer section, or rather, sending files with *ExpressJS*. Interesting, I'm getting more and more proficient with *NodeJS* day by day.
So What did I learn before creating this file (I mean this **README** file full of content)? This:

- The ExpressJS Framework
- Route Params in ExpressJS
- Middleware
- Post Request in ExpressJS
- Put Request in ExpressJS
- Delete Request in ExpressJS
- MVC structure in ExpressJS
- ExpressJS Router
- Sending Files With ExpressJS *(Now Im Here :D)*

Let's Get Started!

I learned this too, but I tried to send both the image and a *JSON* in one response, but it seems like **it's not possible and HTTP can only have one content type (Content-Type) at a time.**

and this is the code:

```mjs
function getUserImage(request, response) {
    const imgPath = path.join(__dirname, "..", "public", "images", "man.png");
    const id = request.params.id;
    const user = users[id];

    if (!user) {
        return response.status(404).json({
            CODE: response.statusCode,
            MESSAGE: `User With ID ${id} Not Found`,
        });
    } else {
        response.sendFile(imgPath);
    }
}
```

## MongoDB

now im just learned something about MongoDB. like: how to save Data in MongoDB and I created a function to save some data
from post method to database.

```mjs
function postNewUser(request, response) {
    const { name, family, age } = request.body;
    const newUser = { name, family, age };

    console.log(newUser);

    if (newUser.name !== undefined && newUser.family !== undefined && newUser.age !== undefined) {
        response.status(201).json({
            CODE: response.statusCode,
            MESSAGE: "User Created",
            USER: newUser,
            USERS: users,
        });
        createUser(newUser.name, newUser.family, newUser.age);
    } else {
        response.status(400).json({
            CODE: response.statusCode,
            MESSAGE: "Cannot Create User!",
        });
    }
}
```
