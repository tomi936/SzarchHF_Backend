var requireOption = require('../common').requireOption;
const sanitize = require('mongo-sanitize');
const error = require('../../helpers/errorHandler');

module.exports = function (objectrepository) {

    var UserModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {

        if(typeof req.params === "undefined" || typeof req.params.userId === "undefined")
            error(res,"No userId to waiter",400);
        UserModel.findOne({_id:sanitize(req.params.userId)}, function (err,result) {
            if(err ||  !result)
                error(res,"Can't find user",400,err);

            res.tpl.waiter = result;
            return next();
        });
    };
};

