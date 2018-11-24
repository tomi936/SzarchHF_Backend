const bcrypt = require('bcrypt');
const sanitize = require('mongo-sanitize');
const jwt = require('jsonwebtoken');
var requireOption = require('../common').requireOption;
const config = require('../../config/jwtconfig.json');

module.exports = function (objectrepository) {

    var UserModel = requireOption(objectrepository, 'userModel');
    var LoginDto = requireOption(objectrepository, 'loginDto');

    return function (req, res, next) {
        console.log("loginUser");

        if ((typeof req.body === 'undefined')|| Object.keys(req.body).length === 0)
        {
            res.tpl.error = "Login user data is empty";
            console.log(res.tpl.error);
            res.sendStatus(400);
        }

        var loginUser = LoginDto.constructFromObject(req.body);
        if ((typeof loginUser.email === 'undefined') || (typeof loginUser.password === 'undefined'))
        {
            res.tpl.error = "Login user data is missing";
            console.log(res.tpl.error);
            res.sendStatus(400);
        }

        UserModel.findOne({ email: sanitize(loginUser.email)}, function (err, user) {
            console.log(err);
            console.log(user);
            if(err ||  user === null)
                res.sendStatus(401);

            if (user && bcrypt.compareSync(loginUser.password, user.password)) {
                //const {password, userWithoutPassword} = user.toObject();
                const token = jwt.sign({id: user.id, role : user.role, name : user.name},config.secret,{ expiresIn: '1y' });
                res.tpl.resObj = {
                    jwt : token
                };
                return next();
            }
            else
                return res.sendStatus(401);

        });
    };
};

