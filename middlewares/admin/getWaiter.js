var requireOption = require('../common').requireOption;
const sanitize = require('mongo-sanitize');

module.exports = function (objectrepository) {

    var UserModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {

        if(typeof req.params === "undefined" || typeof req.params.userId === "undefined")
        {
            res.tpl.error = "No userId to waiter";
            console.log(res.tpl.error);
            return res.sendStatus(400);
        }
        UserModel.findOne({_id:sanitize(req.params.userId)}, function (err,result) {
            if(err ||  !result)
            {
                res.tpl.error = "Can't find user";
                console.log(res.tpl.error);
                res.sendStatus(400);
            }

            res.tpl.waiter = result;
            return next();
        });
    };
};

