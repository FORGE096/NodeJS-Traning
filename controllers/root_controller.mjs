function rootRoute(request, response) {
    response.send({
        CODE: response.statusCode,
        MESSAGE: "All Done!",
    });
}

function postRootRoute(request, response) {
    response.status(400).json({
        CODE: response.statusCode,
        MESSAGE: "Cannot Post Data To ROOT Route!",
    });
}

export {
    rootRoute,
    postRootRoute,
}