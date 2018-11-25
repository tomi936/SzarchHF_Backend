var requireOption = require('../common').requireOption;
const sanitize = require('mongo-sanitize');


module.exports = function (objectrepository) {

    var OrderModel = requireOption(objectrepository, 'orderModel');
    var OrderDto = requireOption(objectrepository, 'orderDto');
    var OrderStatus = requireOption(objectrepository, 'orderStatus');

    return function (req, res, next) {

        if(typeof req.params === "undefined" || typeof req.params.tableId === "undefined")
        {
            res.tpl.error = "No tableId";
            console.log(res.tpl.error);
            return res.sendStatus(400);
        }

        OrderModel.findOne({_tableId:sanitize(req.params.tableId), status : OrderStatus.Open}, function (err, result) {
            if(err)
            {
                res.tpl.error = "DB error during finding table";
                console.log(res.tpl.error);
                return res.status(400).json(res.tpl.error);
            }

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

