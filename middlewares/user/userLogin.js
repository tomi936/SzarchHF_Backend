const bcrypt = require('bcrypt');
const sanitize = require('mongo-sanitize');
const jwt = require('jsonwebtoken');
var requireOption = require('../common').requireOption;


module.exports = function (objectrepository) {

    var UserModel = requireOption(objectrepository, 'userModel');
    var LoginDto = requireOption(objectrepository, 'loginDto');

    return function (req, res, next) {

        if ((typeof req.body === 'undefined'))
            return res.sendStatus(400);

        var loginUser = LoginDto.constructFromObject(req.body);
        if ((typeof loginUser.email === 'undefined') || (typeof loginUser.password === 'undefined'))
            return res.sendStatus(400);

        UserModel.findOne({ email: loginUser.email}, function (err, user) {
            if (user && bcrypt.compareSync(loginUser.password, user.password)) {
                //const {password, userWithoutPassword} = user.toObject();
                const token = jwt.sign({sub: user.id, role : user.role, name : user.name},config.secret,{ expiresIn: '1h' });
                res.tpl.response = {
                    token : token
                };
            }
            return next();
        });
    };
};

