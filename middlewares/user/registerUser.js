var requireOption = require('../common').requireOption;
const bcrypt = require('bcrypt');
const sanitize = require('mongo-sanitize');
const error = require('../../helpers/errorHandler');


module.exports = function (objectrepository) {

    var UserModel = requireOption(objectrepository, 'userModel');
    var ClientRegisterDto = requireOption(objectrepository, 'clientRegisterDto');
    var Role = requireOption(objectrepository, 'role');

    return function (req, res, next) {
        console.log("RegisterUser");
        if(typeof req.body === "undefined" || Object.keys(req.body).length === 0)
            error(res,"New user data is empty",400);

        var editedUser = ClientRegisterDto.constructFromObject(req.body);

        if(typeof editedUser.name === "undefined" || editedUser.name.length === 0 ||
            typeof editedUser.password === "undefined" || editedUser.password.length === 0 ||
            typeof editedUser.email === "undefined" ||editedUser.email.length === 0 ||
            typeof editedUser.address === "undefined" ||editedUser.address.length === 0)
            error(res,"Invalid user data",400);


        var newUser = UserModel();
        newUser.name = sanitize(editedUser.name);
        newUser.email = sanitize(editedUser.email);
        newUser.address = sanitize(editedUser.address);
        newUser.role = Role.Client;
        newUser.loyaltyPoints = 0;

        //TODO: async
        var salt = bcrypt.genSaltSync(10);
        newUser.password = bcrypt.hashSync(editedUser.password, salt);

        newUser.save(function (err) {
            if(err)
                error(res,"Error DB during saving user to DB",500,err);

            return next();
        });

    };
};

