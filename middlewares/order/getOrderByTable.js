var requireOption = require('../common').requireOption;
const sanitize = require('mongo-sanitize');
const error = require('../../helpers/errorHandler');


module.exports = function (objectrepository) {

    var OrderModel = requireOption(objectrepository, 'orderModel');
    var OrderDto = requireOption(objectrepository, 'orderDto');
    var OrderStatus = requireOption(objectrepository, 'orderStatus');

    return function (req, res, next) {

        if(typeof req.params === "undefined" || typeof req.params.tableId === "undefined")
            return error(res,"No tableId",400);

        OrderModel.findOne({_tableId:sanitize(req.params.tableId), status : OrderStatus.Open}, function (err, result) {
            if(err)
                return error(res,"DB error during finding table",500,err);

            res.tpl.resObj={};
            if(result)
            {
                var Order = OrderDto.constructFromObject(result.toObject());
                Order._ownerId = result.owner._id;
                Order.ownerName = result.owner.name;
                Order.address = result.owner.address;
                res.tpl.resObj=Order;
            }
            return next();
        });

    };
};

