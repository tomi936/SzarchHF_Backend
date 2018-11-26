const https = require('https');
var express = require('express');
var app = express();
const cors = require('cors');
var bodyParser = require('body-parser');
const sanitize = require('sanitize');
const jwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

var corsOptions = {
    origin: 'http://localhost',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

//app.use(cors(corsOptions));
app.use(express.static('public'));
app.use(cors());

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
    console.log("Request: " + req.path +" | User: " +user +"\n ->body:" + JSON.stringify(req.body) + " -> params" + JSON.stringify(req.params)
        + "   -> query" + JSON.stringify(req.query));

    return next();
});

// use JWT auth to secure the api
//app.use(jwt());

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
const httpsServer = https.createServer({}, app);
httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
});*/
