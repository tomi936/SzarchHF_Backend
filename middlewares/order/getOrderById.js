var requireOption = require('../common').requireOption;
const sanitize = require('mongo-sanitize');


module.exports = function (objectrepository) {

    var OrderModel = requireOption(objectrepository, 'orderModel');
    var OrderDto = requireOption(objectrepository, 'orderDto');

    return function (req, res, next) {

        var orderId = null;
        if(typeof req.body !== "undefined"&& Object.keys(req.body).length === 0 && typeof req.body.orderId !== "undefined")
            orderId = req.body.orderId;

        if(typeof req.params !== "undefined" && typeof req.params.orderId !== "undefined")
            orderId = req.params.orderId;


        if(!orderId){
            res.tpl.error = "No orderId";
            console.log(res.tpl.error);
            return res.status(400).json(res.tpl.error);
        }

        OrderModel.findOne({_id:sanitize(orderId)}, function (err, result) {
            if(err)
            {
                res.tpl.error = "DB error during finding order";
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

