function getUserImage(name) {
    return new Promise((onDone, onError) => {
        setTimeout(() => {
            console.log("Data is Ready " + name);
        }, 2000);
    });
}

getUserImage("Mohammad").then(data => console.log(data));