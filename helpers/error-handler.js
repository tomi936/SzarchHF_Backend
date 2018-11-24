module.exports = errorHandler;

function errorHandler(err, req, res, next) {
    console.log("Error: " + JSON.stringify(err));
    if (typeof (err) === 'string') {
        // custom application error

        return res.sendStatus(400);
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({ message: 'Invalid Token' });
    }

    // default to 500 server error
    return res.sendStatus(500);
}