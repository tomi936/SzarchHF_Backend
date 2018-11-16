var requireOption = require('../common').requireOption;


module.exports = function (objectrepository) {

    var UserModel = requireOption(objectrepository, 'userModel');
    var clientDto = requireOption(objectrepository, 'clientDto');

    return function (req, res, next) {
        console.log("getSelfUser");

        UserModel.findOne({id:req.user.id}, function (err,result) {
            console.log(result);
            if(err || !result)
            {
                res.tpl.error = "Can't find user";
                console.log(res.tpl.error);
                res.status(400).json(res.tpl.error);
            }

            result = result.toObject();
            delete result.password;
            res.tpl.resObj = clientDto.constructFromObject(result);
            return next();
        });
    };
};

