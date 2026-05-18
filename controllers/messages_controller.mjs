function getMessage(request, response) {
    response.send({
        CODE: response.statusCode,
        MESSAGE: "Hello The Sample",
    });
}

function postMessage(request, response) {
    if (!request.body.message) {
        return response.status(404).json({
            CODE: response.statusCode,
            MESSAGE: "Can't Add Message!",
        });
    }

    const message = request.body.message;

    response.send({
        CODE: response.statusCode,
        MESSAGE: "Message Added!",
        ADDED_MESSAGE: message,
    });
}

export {
    getMessage,
    postMessage,
}