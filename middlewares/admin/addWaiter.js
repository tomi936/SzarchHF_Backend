const error = require('../../helpers/errorHandler');
var requireOption = require('../common').requireOption;
const bcrypt = require('bcrypt');
const sanitize = require('mongo-sanitize');


module.exports = function (objectrepository) {

    var UserModel = requireOption(objectrepository, 'userModel');
    var Role = requireOption(objectrepository, 'Role');
    var UserDto = requireOption(objectrepository, 'userDto');

    return function (req, res, next) {

        if(typeof req.body === "undefined" || Object.keys(req.body).length === 0)
            return error(res,"New waiter data is empty",400);
        var editedUser = UserDto.constructFromObject(req.body);

        if(typeof editedUser.name === "undefined" || editedUser.name.length === 0 ||
            typeof editedUser.password === "undefined" || editedUser.password.length === 0 ||
            typeof editedUser.email === "undefined" ||editedUser.email.length === 0 )
            return error(res,"Invalid waiter data",400);

        var newUser = UserModel();
        newUser.name = sanitize(editedUser.name);
        newUser.email = sanitize(editedUser.email);
        newUser.address = null;
        newUser.role = Role.Waiter;
        newUser.loyaltyPoints = 0;

        //TODO: async
        var salt = bcrypt.genSaltSync(10);
        newUser.password = bcrypt.hashSync(editedUser.password, salt);


        newUser.save(function (err) {
            if(err)
                return error(res,"Error DB during saving waiter to DB",500,err);

            return next();
        });

    };
};

