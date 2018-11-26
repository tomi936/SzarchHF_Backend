var requireOption = require('../common').requireOption;
const sanitize = require('mongo-sanitize');
const error = require('../../helpers/errorHandler');


module.exports = function (objectrepository) {

    var UserModel = requireOption(objectrepository, 'userModel');
    var clientDto = requireOption(objectrepository, 'clientDto');

    return function (req, res, next) {

        UserModel.findOne({_id:sanitize(req.user.id)}, function (err,result) {
            if(err || !result)
                return error(res,"Can't find user",400,err);

            result = result.toObject();
            delete result.password;
            res.tpl.resObj = clientDto.constructFromObject(result);
            return next();
        });
    };
};

