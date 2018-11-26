var requireOption = require('../common').requireOption;
const sanitize = require('mongo-sanitize');


module.exports = function (objectrepository) {

    var OrderModel = requireOption(objectrepository, 'orderModel');
    var CartItemDto = requireOption(objectrepository, 'cartItemDto');
    var OrderStatus = requireOption(objectrepository, 'orderStatus');
    var Role = requireOption(objectrepository, 'Role');

    return async function (req, res, next) {
        console.log("updateOrder");
        if (typeof req.body === "undefined" || Object.keys(req.body).length === 0) {
            res.tpl.error = "body is empty";
            console.log(res.tpl.error);
            return res.sendStatus(400);
        }
        if (req.user.role == Role.Client && (typeof req.body.cart === "undefined" || typeof req.body.discount === "undefined")) {
            res.tpl.error = "Order data is empty";
            console.log(res.tpl.error);
            return res.sendStatus(400);
        }
        if (req.user.role == Role.Waiter && (typeof req.body.orderItems === "undefined" || typeof req.body._tableId === "undefined" || req.body._tableId == null)) {
            res.tpl.error = "Order data is empty";
            console.log(res.tpl.error);
            return res.sendStatus(400);
        }
        if (typeof res.tpl.menuItems === "undefined" ) {
            res.tpl.error = "Missing menuItems";
            console.log(res.tpl.error);
            return res.sendStatus(400);
        }
        if (typeof res.tpl.tables === "undefined" || res.tpl.tables == null || res.tpl.tables.length === 0) {
            res.tpl.error = "Missing tables";
            console.log(res.tpl.error);
            return res.sendStatus(400);
        }


        var Order = null;

        if (typeof res.tpl.order !== "undefined" && res.tpl.order != null) {
            if(res.tpl.status !== OrderStatus.Open)
            {
                res.tpl.error = "Can not edit finished or closed order!";
                console.log(res.tpl.error);
                return res.sendStatus(400);
            }
            Order = res.tpl.order;
        }
        else {
            Order = new OrderModel();
            Order.owner = req.user.id;
            res.tpl.order = Order;
        }

        if(req.body._tableId != null)
        {
            if(res.tpl.tables.some(t=>t.id === req.body.tableId))
            {
                res.tpl.error = "Wrong table Id";
                console.log(res.tpl.error);
                return res.sendStatus(400);
            }
            var query = {$and:[{_tableId:sanitize(req.body._tableId)},{status:OrderStatus.Open}]};
            if(Order._id != null)
                query.$and.push({_id:{$ne:Order._id}});
            var openOrder = await OrderModel.find(query).exec();
            if(openOrder && openOrder.length>0)
            {
                res.tpl.error = "There is an open order for this table";
                console.log(res.tpl.error);
                return res.sendStatus(400);
            }
        }

        Order.time = new Date();
        Order.sum = 0;
        Order.rating = 0;
        Order.status = OrderStatus.Open;
        Order.orderItems.splice(0, Order.orderItems.length);
        Order.discount = 0;

        if(req.user.role === Role.Client)
        {
            Order._tableId = null;
            Order.discount = sanitize(parseInt(req.body.discount));
            Order.type = "Web";
            req.body.cart.forEach(function (item) {
                var orderedItem = CartItemDto.constructFromObject(item);
                if (typeof orderedItem.menuItemId === "undefined" || orderedItem.menuItemId.length === 0 ||
                    typeof orderedItem.amount === "undefined") {
                    res.tpl.error = "Invalid orderItem data";
                    console.log(res.tpl.error);
                    return res.status(400).json(res.tpl.error);
                }
                var mItem = res.tpl.menuItems.find(e => e.menuItemId === orderedItem.menuItemId);
                if(!mItem)
                {
                    console.log("Invalid menuItemId in orderedItems");
                    return;
                }

                if(orderedItem.amount>0)
                {
                    Order.orderItems.push({_menuItemId: sanitize(orderedItem.menuItemId), amount: sanitize(orderedItem.amount)});
                    res.tpl.order.sum+=mItem.price*orderedItem.amount;
                }
            });
        }
        else if(req.user.role === Role.Waiter)
        {
            Order._tableId = sanitize(req.body._tableId);
            Order.type = "Local";
            req.body.orderItems.forEach(function (item) {
                var orderedItem = CartItemDto.constructFromObject(item);
                if (typeof orderedItem.menuItemId === "undefined" || orderedItem.menuItemId.length === 0 ||
                    typeof orderedItem.amount === "undefined") {
                    res.tpl.error = "Invalid orderItem data";
                    console.log(res.tpl.error);
                    return res.status(400).json(res.tpl.error);
                }
                var mItem = res.tpl.menuItems.find(e => e.menuItemId === orderedItem.menuItemId);
                if(!mItem)
                {
                    console.log("Invalid menuItemId in orderedItems");
                    return;
                }

                if(orderedItem.amount>0)
                {
                    Order.orderItems.push({_menuItemId: sanitize(orderedItem.menuItemId), amount: sanitize(orderedItem.amount)});
                    res.tpl.order.sum+=mItem.price*orderedItem.amount;
                }
            });
        }


        Order.sum = Order.sum * ((100-Order.discount)/100);


        Order.save(function (err) {
            if (err) {
                res.tpl.error = "Error DB during saving order to DB";
                console.log(res.tpl.error);
                return res.sendStatus(500);
            }

            return next();
        });
    };
};

