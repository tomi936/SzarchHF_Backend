module.exports = errorHandler;
const debugMessages = true;
function errorHandler(res, message, code, err) {

    var msg = "";
    if(typeof code != "undefined")
        code = 500;

    if (typeof message != "undefined"  )
        msg = "Error ["+code+"]: " + message +"\n";

    if(typeof err != "undefined")
        msg +="Exception: " + JSON.stringify(err);

    console.log(msg);

    if(debugMessages)
        return res.status(code).json({message:msg});
    else
        return res.status(code).json();
}