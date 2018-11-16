var requireOption = require('../common').requireOption;
const bcrypt = require('bcrypt');
const sanitize = require('mongo-sanitize');

module.exports = function (objectrepository) {

    var UserModel = requireOption(objectrepository, 'userModel');
    var UserDto = requireOption(objectrepository, 'userDto');

    return function (req, res, next) {
        console.log("updateUser");
        if(typeof req.body === "undefined" || Object.keys(req.body).length === 0 || typeof res.tpl.user === "undefined")
        {
            res.tpl.error = "New user data is empty";
            console.log(res.tpl.error);
            return res.status(400).json(res.tpl.error);
        }
        console.log(req.body);
        console.log(req.body.name);
        console.log(req.body.email);
        var editedUser = UserDto.constructFromObject(req.body);

        if(typeof editedUser.name === "undefined" || editedUser.name.length === 0 ||
            typeof editedUser.email === "undefined" ||editedUser.email.length === 0 ||
            typeof editedUser.address === "undefined" ||editedUser.address.length === 0)
        {
            res.tpl.error = "Invalid user data";
            console.log(res.tpl.error);
            return res.status(400).json(res.tpl.error);
        }

        res.tpl.user.name = sanitize(editedUser.name);
        res.tpl.user.email = sanitize(editedUser.email);
        res.tpl.user.address = sanitize(editedUser.address);

        if(typeof editedUser.password !== "undefined" && editedUser.password.length > 0 )
        {
            //TODO: async
            var salt = bcrypt.genSaltSync(10);
            var hash = bcrypt.hashSync(editedUser.password, salt);

            res.tpl.user.password = hash;
        }

        res.tpl.user.save(function (err) {
            if(err)
            {
                res.tpl.error = "Error DB during saving user to DB";
                console.log(res.tpl.error);
                return res.status(500).json(res.tpl.error);
            }

            return next();
        });
    };
};

