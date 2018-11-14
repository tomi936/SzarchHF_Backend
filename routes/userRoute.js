var mainRedirectMW = require('../middlewares/generic/mainRedirect');
var inverseAuthMW = require('../middlewares/generic/inverseAuth');
var authMW = require('../middlewares/generic/Auth');
var userLoginMW = require('../middlewares/user/userLogin');
var registerUserMW = require('../middlewares/user/registerUser');
var checkIfUserRegisteredMW = require('../middlewares/user/checkIfUserRegistered');
var getUserMW = require('../middlewares/user/getUser');
var getSelfUser = require('../middlewares/user/getSelfUser');
var updateUserMW = require('../middlewares/user/updateUser');
var responseJSON = require('../middlewares/generic/responseJSON');

var userModel = require('../models/user');
var loginDto = require('../dtos/LoginDto');
var clientRegisterDto = require('../dtos/ClientRegisterDto');

module.exports = function(app){
    var objectRepository = {
        userModel: userModel,
        loginDto: loginDto,
        clientRegisterDto: clientRegisterDto
    };
    //Login
    app.route("/user/login").post(
      inverseAuthMW(objectRepository),
      userLoginMW(objectRepository),
      responseJSON(objectRepository)
    );

    //Registration
    app.route("/user/").post(
        inverseAuthMW(objectRepository ),
        checkIfUserRegisteredMW(objectRepository),
        registerUserMW(objectRepository)
    );

    //Edit profile
    app.route("/user/").put(
        authMW(objectRepository,userModel.Role.Client, false),
        getUserMW(objectRepository),
        updateUserMW(objectRepository)
    );

    //Get profile
    app.route("/user/").get(
        authMW(objectRepository,userModel.Role.Client,false),
        getSelfUser(objectRepository),
        responseJSON(objectRepository)
        );
};