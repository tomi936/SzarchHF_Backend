var requireOption = require('../common').requireOption;
const sanitize = require('mongo-sanitize');


module.exports = function (objectrepository) {

    var OrderModel = requireOption(objectrepository, 'orderModel');
    var CartItemDto = requireOption(objectrepository, 'cartItemDto');
    var OrderStatus = requireOption(objectrepository, 'orderStatus');

    return function (req, res, next) {
        console.log("updateOrder");
        if (typeof req.body === "undefined" || Object.keys(req.body).length === 0) {
            res.tpl.error = "body is empty";
            console.log(res.tpl.error);
            return res.sendStatus(400);
        }
        if (typeof req.body.cart === "undefined" || typeof req.body.discount === "undefined") {
            res.tpl.error = "Order data is empty";
            console.log(res.tpl.error);
            return res.sendStatus(400);
        }
        console.log(req.body);

        var Order = null;

        if (typeof res.tpl.order !== "undefined" && res.tpl.order != null)
            Order = res.tpl.order;
        else {
            Order = new OrderModel();
            Order.owner = req.user.id;
            res.tpl.order = Order;
        }

        Order.time = new Date();
        Order._tableId = null;
        Order.sum = 0;
        Order.rating = 0;
        Order.status = OrderStatus.Open;
        Order.discount = sanitize(parseInt(req.body.discount));
        Order.orderItems.splice(0, Order.orderItems.length);

        //TODO: Check if ordered items are valid
        //TODO: Calc sum
        req.body.cart.forEach(function (item) {
            var orderedItem = CartItemDto.constructFromObject(item);
            if (typeof orderedItem.menuItemId === "undefined" || orderedItem.menuItemId.length === 0 ||
                typeof orderedItem.amount === "undefined") {
                res.tpl.error = "Invalid orderItem data";
                console.log(res.tpl.error);
                return res.status(400).json(res.tpl.error);
            }

            Order.orderItems.push({_menuItemId: sanitize(orderedItem.menuItemId), amount: sanitize(orderedItem.amount)});
        });

        Order.save(function (err) {
            if (err) {
                res.tpl.error = "Error DB during saving order to DB";
                console.log(res.tpl.error);
                return res.status(500).json(res.tpl.error);
            }

            return next();
        });
    };
}

