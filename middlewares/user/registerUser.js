var requireOption = require('../common').requireOption;
const bcrypt = require('bcrypt');
const sanitize = require('mongo-sanitize');


module.exports = function (objectrepository) {

    var UserModel = requireOption(objectrepository, 'userModel');
    var ClientRegisterDto = requireOption(objectrepository, 'clientRegisterDto');
    var Role = requireOption(objectrepository, 'role');

    return function (req, res, next) {
        console.log("RegisterUser");
        if(typeof req.body === "undefined" || Object.keys(req.body).length === 0)
        {
            res.tpl.error = "New user data is empty";
            console.log(res.tpl.error);
            res.sendStatus(400);
        }
        var editedUser = ClientRegisterDto.constructFromObject(req.body);

        if(typeof editedUser.name === "undefined" || editedUser.name.length === 0 ||
            typeof editedUser.password === "undefined" || editedUser.password.length === 0 ||
            typeof editedUser.email === "undefined" ||editedUser.email.length === 0 ||
            typeof editedUser.address === "undefined" ||editedUser.address.length === 0)
        {
            res.tpl.error = "Invalid user data";
            console.log(res.tpl.error);
            res.status(400).json(res.tpl.error);
        }

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
            {
                res.tpl.error = "Error DB during saving user to DB";
                console.log(res.tpl.error);
                res.status(500).json(res.tpl.error);
            }

            return next();
        });

    };
};

