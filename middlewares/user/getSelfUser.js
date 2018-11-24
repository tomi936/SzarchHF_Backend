var requireOption = require('../common').requireOption;
const sanitize = require('mongo-sanitize');


module.exports = function (objectrepository) {

    var UserModel = requireOption(objectrepository, 'userModel');
    var clientDto = requireOption(objectrepository, 'clientDto');

    return function (req, res, next) {
        console.log("getSelfUser");

        UserModel.findOne({_id:sanitize(req.user.id)}, function (err,result) {
            console.log(result);
            if(err || !result)
            {
                res.tpl.error = "Can't find user";
                console.log(res.tpl.error);
                return res.sendStatus(400);
            }

            result = result.toObject();
            delete result.password;
            res.tpl.resObj = clientDto.constructFromObject(result);
            return next();
        });
    };
};

