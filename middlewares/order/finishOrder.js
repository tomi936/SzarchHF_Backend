var requireOption = require('../common').requireOption;
const sanitize = require('mongo-sanitize');
const error = require('../../helpers/errorHandler');


module.exports = function (objectrepository) {

    var OrderStatus = requireOption(objectrepository, 'orderStatus');
    var UserModel = requireOption(objectrepository, 'userModel');
    var Role = requireOption(objectrepository, 'Role');

    return function (req, res, next) {
        if(typeof res.tpl.order === "undefined" || res.tpl.order === null)
            return error(res,"Cant find order model",400);
        if(res.tpl.order.status === OrderStatus.Closed)
            return error(res,"Cant finish closed order",400);

        res.tpl.order.status = OrderStatus.Finished;
        res.tpl.order.save(function (err) {
            if (err)
                return error(res,"Error DB during saving order to DB",500,err);

            if(res.tpl.order._tableId == null)
            UserModel.findOne({_id:sanitize(res.tpl.order.owner)}, function (err,result) {
                if(err || !result)
                    return error(res,"Can't find owner of the user",400,err);
                if(result.role == Role.Client)
                    result.loyaltyPoints += 2;
                result.save(function (err) {
                    if(err)
                        return error(res,"Error DB during saving user to DB",500,err);
                });
            });
            return next();
        });

    };
};

