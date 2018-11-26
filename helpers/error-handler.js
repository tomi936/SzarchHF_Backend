module.exports = errorHandler;

function errorHandler(err, req, res, next) {

    console.log("Error: " + JSON.stringify(err));
    if (typeof res.tpl != "undefined")

    if (typeof err != "undefined" && err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({ message: 'Invalid Token' });
    }

    // default to 500 server error
    return res.sendStatus(500);
}