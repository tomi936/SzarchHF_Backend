var requireOption = require('../common').requireOption;


module.exports = function (objectrepository) {

    var OrderModel = requireOption(objectrepository, 'orderModel');
    var OrderDto = requireOption(objectrepository, 'orderDto');


    return function (req, res, next, isWaiter = false) {
        var whereState = {};
        if(isWaiter)
            whereState={$or:[ {owner : req.user.id}, {_tableId: null} ]};
        else
            whereState={owner : req.user.id};

        OrderModel.find({whereState}).populate("owner").select("-owner.password").exec(function (err,result) {
            if(err || !result)
            {
                res.tpl.error = "Can't load menu";
                console.log(res.tpl.error);
                return res.status(400).json(res.tpl.error);
            }

            //console.log(result);

            res.tpl.resObj=[];
            if(result.length>0) {
                result.forEach(function (item) {
                    var Order = OrderDto.constructFromObject(item.toObject());
                    Order._ownerId = item.owner._id;
                    Order.ownerName = item.owner.name;
                    Order.address = item.owner.address;
                    res.tpl.resObj.push(Order);
                });
            }
            return next();
        });

    };
};

