var requireOption = require('../common').requireOption;
const error = require('../../helpers/errorHandler');


module.exports = function (objectrepository) {

    var CartModel = requireOption(objectrepository, 'cartModel');
    var CarItemDto = requireOption(objectrepository, 'cartItemDto');

    return function (req, res, next) {
        CartModel.findOne({_clientId:req.user.id}).populate('orderItems._menuItemId').exec(function (err, result) {
            if(err)
                return error(res,"DB error during loading cart",500,err);

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
};

