var requireOption = require('../common').requireOption;
const error = require('../../helpers/errorHandler');


module.exports = function (objectrepository) {

    var UserModel = requireOption(objectrepository, 'userModel');
    var Role = requireOption(objectrepository, 'Role');
    var UserDto = requireOption(objectrepository, 'userDto');

    return function (req, res, next) {

        UserModel.find({role:Role.Waiter}, function (err,result) {
            console.log(result);
            if(err || !result)
                return error(res,"Can't load waiters",400,err);

            res.tpl.resObj=[];
            if(result.length>0) {
                result.forEach(function (item) {
                    item = item.toObject();
                    delete item.password;
                    var Waiter = UserDto.constructFromObject(item);
                    res.tpl.resObj.push(Waiter);
                });
            }

            return next();
        });
    };
};

