var requireOption = require('../common').requireOption;


module.exports = function (objectrepository) {

    var CartModel = requireOption(objectrepository, 'cartModel');
    var CarItemDto = requireOption(objectrepository, 'cartItemDto');

    return function (req, res, next) {
        CartModel.findOne({_clientId:req.user.id}, function (err, result) {
            if(err)
            {
                res.tpl.error = "DB error during loading cart";
                console.log(res.tpl.error);
                return res.status(400).json(res.tpl.error);
            }

            res.tpl.cart = result;
            res.tpl.resObj = [];
            if(result)
            {
                var resultObj = result.toObject();
                resultObj.orderItems.forEach(function (item) {
                    var cItem = CarItemDto.constructFromObject(item);
                    res.tpl.resObj.push(cItem);
                });
            }
            return next();

        });


    };
}

