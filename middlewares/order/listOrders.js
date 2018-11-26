var requireOption = require('../common').requireOption;
const error = require('../../helpers/errorHandler');


module.exports = function (objectrepository) {

    var OrderModel = requireOption(objectrepository, 'orderModel');
    var OrderDto = requireOption(objectrepository, 'orderDto');
    var OrderStatus = requireOption(objectrepository, 'orderStatus');
    var Role = requireOption(objectrepository, 'Role');


    return function (req, res, next) {
        var whereState = {};
        if(req.user.role === Role.Waiter)
            whereState={$and:[{$or:[ {owner : req.user.id}, {_tableId: null} ]},{
                status : {$ne:OrderStatus.Closed}}]};
        else
            whereState={owner : req.user.id};

        OrderModel.find(whereState).populate("owner").exec(function (err,result) {
            if(err)
                error(res,"Can't load orders",500,err);

            //console.log(result);

            res.tpl.resObj=[];
            if(result && result.length>0) {
                result.forEach(function (item) {
                    var Order = OrderDto.constructFromObject(item.toObject());
                    Order.ownerId = item.owner._id;
                    Order.ownerName = item.owner.name;
                    Order.address = item.owner.address;
                    res.tpl.resObj.push(Order);
                });
            }
            return next();
        });

    };
};

