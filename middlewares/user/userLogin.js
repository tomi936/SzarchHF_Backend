const bcrypt = require('bcrypt');
const error = require('../../helpers/errorHandler');
const sanitize = require('mongo-sanitize');
const jwt = require('jsonwebtoken');
var requireOption = require('../common').requireOption;
const config = require('../../config/jwtconfig.json');

module.exports = function (objectrepository) {

    var UserModel = requireOption(objectrepository, 'userModel');
    var LoginDto = requireOption(objectrepository, 'loginDto');

    return function (req, res, next) {

        if ((typeof req.body === 'undefined')|| Object.keys(req.body).length === 0)
            error(res,"Login user data is empty",400);

        var loginUser = LoginDto.constructFromObject(req.body);
        if ((typeof loginUser.email === 'undefined') || (typeof loginUser.password === 'undefined'))
            error(res,"Login user data is missing",400);

        UserModel.findOne({ email: sanitize(loginUser.email)}, function (err, user) {
            if(err ||  user === null)
                error(res,"",500,err);

            if (user && bcrypt.compareSync(loginUser.password, user.password)) {
                //const {password, userWithoutPassword} = user.toObject();
                const token = jwt.sign({id: user.id, role : user.role, name : user.name},config.secret,{ expiresIn: '1y' });
                res.tpl.resObj = {
                    jwt : token
                };
                return next();
            }
            else
                error(res,"",401);

        });
    };
};

