var requireOption = require('../common').requireOption;
const bcrypt = require('bcrypt');
const sanitize = require('mongo-sanitize');
const error = require('../../helpers/errorHandler');

module.exports = function (objectrepository) {

    var UserModel = requireOption(objectrepository, 'userModel');
    var UserDto = requireOption(objectrepository, 'userDto');

    return function (req, res, next) {
        if(typeof req.body === "undefined" || Object.keys(req.body).length === 0 || typeof res.tpl.user === "undefined")
            error(res,"New user data is empty",400);


        if(typeof res.tpl.user === "undefined" || res.tpl.user==null)
            error(res,"Can not find user",400);
        var editedUser = UserDto.constructFromObject(req.body);

        if(typeof editedUser.name === "undefined" || editedUser.name.length === 0 ||
            typeof editedUser.email === "undefined" ||editedUser.email.length === 0 ||
            typeof editedUser.address === "undefined" ||editedUser.address.length === 0)
            error(res,"Invalid user data",400);


        res.tpl.user.name = sanitize(editedUser.name);
        res.tpl.user.email = sanitize(editedUser.email);
        res.tpl.user.address = sanitize(editedUser.address);

        if(typeof editedUser.password !== "undefined" && editedUser.password.length > 0 )
        {
            //TODO: async
            var salt = bcrypt.genSaltSync(10);
            res.tpl.user.password = bcrypt.hashSync(editedUser.password, salt);
        }

        res.tpl.user.save(function (err) {
            if(err)
                error(res,"Error DB during saving user to DB",500, err);

            return next();
        });
    };
};

