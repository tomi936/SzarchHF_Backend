var requireOption = require('../common').requireOption;
const sanitize = require('mongo-sanitize');


module.exports = function (objectrepository) {

    var CartModel = requireOption(objectrepository, 'cartModel');
    var CarItemDto = requireOption(objectrepository, 'cartItemDto');

    return function (req, res, next) {
        console.log("updateCart");
        if(typeof req.body === "undefined" || Object.keys(req.body).length === 0)
        {
            res.tpl.error = "New cart data is empty";
            console.log(res.tpl.error);
            return res.status(400).json(res.tpl.error);
        }
        console.log(req.body);
        console.log(req.body.length);

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
            {
                res.tpl.error = "Invalid orderItem data";
                console.log(res.tpl.error);
                return res.status(400).json(res.tpl.error);
            }

            Cart.orderItems.push({_menuItemId: sanitize(orderedItem.menuItemId), amount:sanitize(orderedItem.amount)});
        });

        Cart.save(function (err) {
            if(err)
            {
                res.tpl.error = "Error DB during saving cart to DB";
                console.log(res.tpl.error);
                return res.status(500).json(res.tpl.error);
            }

            return next();
        });
    };
}

