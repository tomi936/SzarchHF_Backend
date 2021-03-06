var requireOption = require('../common').requireOption;
const sanitize = require('mongo-sanitize');
const error = require('../../helpers/errorHandler');


module.exports = function (objectrepository) {

    var UserModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {
        UserModel.findOne({_id:sanitize(req.user.id)}, function (err,result) {
            if(err)
                return error(res,"DB Error during getting User",500,err);

            res.tpl.user = result;
            return next();
        });

    };
};

