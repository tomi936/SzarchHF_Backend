var requireOption = require('../common').requireOption;
const sanitize = require('mongo-sanitize');


module.exports = function (objectrepository) {

    var UserModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {
        console.log("getUser");
        UserModel.findOne({_id:sanitize(req.user.id)}, function (err,result) {
            if(err)
            {
                res.tpl.error = "DB Error during getting User";
                console.log(res.tpl.error);
                res.sendStatus(400);
            }

            res.tpl.user = result;
            return next();
        });

    };
};

