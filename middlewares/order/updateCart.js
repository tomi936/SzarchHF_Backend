var requireOption = require('../common').requireOption;
const sanitize = require('mongo-sanitize');
const error = require('../../helpers/errorHandler');


module.exports = function (objectrepository) {

    var CartModel = requireOption(objectrepository, 'cartModel');
    var CarItemDto = requireOption(objectrepository, 'cartItemDto');

    return function (req, res, next) {
        if(typeof req.body === "undefined" || Object.keys(req.body).length === 0)
            error(res,"New cart data is empty",400);

        var Cart = null;

        if(res.tpl.cart == null) {
            Cart = new CartModel();
            Cart._clientId = req.user.id;
        }
        else
            Cart = res.tpl.cart;

        Cart.time = new Date();
        Cart.orderItems.splice(0,Cart.orderItems.length);

        req.body.forEach(function (item) {
            var orderedItem = CarItemDto.constructFromObject(item);
            if(typeof orderedItem.menuItemId === "undefined" || orderedItem.menuItemId.length === 0 ||
                typeof orderedItem.amount === "undefined" )
                error(res,"Invalid orderItem data",400);

            Cart.orderItems.push({_menuItemId: sanitize(orderedItem.menuItemId), amount:sanitize(orderedItem.amount)});
        });

        Cart.save(function (err) {
            if(err)
                error(res,"Error DB during saving cart to DB",500,err);

            return next();
        });
    };
};

