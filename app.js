const https = require('https');
var express = require('express');
var app = express();
const expressJwt = require('express-jwt');
//var session = require('express-session');
var bodyParser = require('body-parser');
const sanitize = require('sanitize');
const jwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');

app.use(express.static('public'));
/**
 * Session above all
 */
/*app.use(session({
    secret: 'keyboard cat',
    cookie: {
        maxAge: 60000
    },
    resave: true,
    saveUninitialized: false
}));*/

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
    res.tpl.error = [];
    res.tpl.resObj = undefined;
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
