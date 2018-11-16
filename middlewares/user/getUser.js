var requireOption = require('../common').requireOption;


module.exports = function (objectrepository) {

    var UserModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {
        console.log("getUser");
        UserModel.findOne({_id:req.user.id}, function (err,result) {
            if(err || typeof result === "undefined")
            {
                res.tpl.error = "Can't find user";
                console.log(res.tpl.error);
                res.status(400).json(res.tpl.error);
            }

            res.tpl.user = result;
            return next();
        });

    };
};

