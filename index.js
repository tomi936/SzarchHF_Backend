const https = require('https');
var express = require('express');
var app = express();
const cors = require('cors');
const helmet = require('helmet');
var bodyParser = require('body-parser');
const sanitize = require('sanitize');
const jwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');




app.use(express.static('public'));

//CORS Settings
var corsOptions = {
    origin: 'http://localhost',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
//Example:
// app.use(cors(corsOptions));
app.use(cors());
app.use(helmet());
/**
 * Parse parameters in POST
 */
// for parsing application/json
app.use(bodyParser.json());
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(sanitize.middleware);
app.use(jwt());



/**
 * Let's creat the .tpl and .error on the res object
 */
app.use(function (req, res, next) {
    res.tpl = {};
    res.tpl.error = "";
    res.tpl.errorCode = 0;
    res.tpl.resObj = undefined;

    var user = "";
    if(typeof req.user != "undefined")
        user= JSON.stringify(req.user);
    else
        user = "Unauthorized";
    console.log("Request: "+req.method+" " + req.path +" | User: " +user +"\n ->body:" + JSON.stringify(req.body) + " -> params" + JSON.stringify(req.params)
        + "   -> query" + JSON.stringify(req.query));

    return next();
});

/**
 * Include all the routes
 */
require('./routes/userRoute')(app);
require('./routes/clientRoute')(app);
require('./routes/waiterRoute')(app);
require('./routes/adminRoute')(app);


/**
 * Standard error handler
 */
app.use(errorHandler);

var server = app.listen(3000, function () {
    console.log("listening on: 3000");
});

/*

//HTTPS Server Example
var HttpsOptions = {
    key: fs.readFileSync('test/fixtures/keys/agent2-key.pem'),
    cert: fs.readFileSync('test/fixtures/keys/agent2-cert.cert')
};

const httpsServer = https.createServer(HttpsOptions, app);
httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
});*/
