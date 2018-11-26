
var authMW = require('../middlewares/generic/Auth');
var userLoginMW = require('../middlewares/user/userLogin');
var registerUserMW = require('../middlewares/user/registerUser');
var checkIfUserRegisteredMW = require('../middlewares/user/checkIfUserRegistered');
var getUserMW = require('../middlewares/user/getUser');
var getSelfUserMW = require('../middlewares/user/getSelfUser');
var updateUserMW = require('../middlewares/user/updateUser');
var responseJSON = require('../middlewares/generic/responseJSON');

var userModel = require('../models/User');
var Role = require('../models/Roles');
var loginDto = require('../dtos/LoginDto');
var userDto = require('../dtos/UserDto');
var clientRegisterDto = require('../dtos/ClientRegisterDto');
var clientDto = require('../dtos/ClientDto');

module.exports = function(app){
    var objectRepository = {
        userModel: userModel,
        loginDto: loginDto,
        userDto:userDto,
        clientRegisterDto: clientRegisterDto,
        clientDto:clientDto,
        role:Role
    };
    //Login
    app.route("/user/login").post(
      inverseAuthMW(objectRepository),
      userLoginMW(objectRepository),
      responseJSON(objectRepository)
    );

    //Registration
    app.route("/user/register").post(
        inverseAuthMW(objectRepository ),
        checkIfUserRegisteredMW(objectRepository),
        registerUserMW(objectRepository),
        function (req,res,next) {
            return res.status(200).json();
        }
    );

    //Edit profile
    app.route("/user/").put(
        authMW(objectRepository,Role.Client, false),
        getUserMW(objectRepository),
        updateUserMW(objectRepository),
        function (req,res,next) {
            return res.status(200).json();
        }
    );

    //Get profile
    app.route("/user/").get(
        authMW(objectRepository,Role.Client,false),
        getSelfUserMW(objectRepository),
        responseJSON(objectRepository)
    );
};