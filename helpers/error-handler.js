module.exports = errorHandler;

function errorHandler(err, req, res, next) {

    console.log("Error: " + JSON.stringify(err));
    if (typeof res.tpl.error != "undefined" && typeof res.tpl.errorCode!= "undefined"
        && res.tpl.error.length>0 && res.tpl.errorCode>0) {
        // custom application error
        var errStr = res.tpl.error;
        if(typeof err != "undefined" && err!= null)
            errStr += " - " + JSON.stringify(err);
        console.log(errStr);
        return res.sendStatus(res.tpl.errorCode);
    }

    if (typeof err != "undefined" && err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(401).json({ message: 'Invalid Token' });
    }

    // default to 500 server error
    return res.sendStatus(500);
}