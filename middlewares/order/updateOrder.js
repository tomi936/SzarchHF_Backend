var requireOption = require('../common').requireOption;
const sanitize = require('mongo-sanitize');
const error = require('../../helpers/errorHandler');


module.exports = function (objectrepository) {

    var OrderModel = requireOption(objectrepository, 'orderModel');
    var CartItemDto = requireOption(objectrepository, 'cartItemDto');
    var OrderStatus = requireOption(objectrepository, 'orderStatus');
    var Role = requireOption(objectrepository, 'Role');

    return async function (req, res, next) {
        if (typeof req.body === "undefined" || Object.keys(req.body).length === 0)
            return error(res,"body is empty",400);
        if (req.user.role == Role.Client && (typeof req.body.cart === "undefined" || typeof req.body.discount === "undefined"))
            return error(res,"Body is empty",400);
        if (req.user.role == Role.Waiter && (typeof req.body.orderItems === "undefined" || typeof req.body.tableId === "undefined" || req.body.tableId == null))
            return error(res,"Order data is empty",400);
        if (typeof res.tpl.menuItems === "undefined" )
            return error(res,"\"Missing menuItems",500);


        var Order = null;

        if (typeof res.tpl.order !== "undefined" && res.tpl.order != null) {
            if(res.tpl.order.status !== OrderStatus.Open)
                return error(res,"Can not edit finished or closed order!",400);
            Order = res.tpl.order;
        }
        else {
            Order = new OrderModel();
            Order.owner = req.user.id;
            res.tpl.order = Order;
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
            var disc = parseInt(req.body.discount);
            if(disc>res.tpl.user.loyaltyPoints)
                return error(res,"Discount is bigger than it should be",400);
            Order.discount = disc;
            Order.type = "Web";
            req.body.cart.forEach(function (item) {
                var orderedItem = CartItemDto.constructFromObject(item);
                if (typeof orderedItem.menuItemId === "undefined" || orderedItem.menuItemId.length === 0 ||
                    typeof orderedItem.amount === "undefined")
                    return error(res,"Invalid orderItem data",400);
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
            if (typeof res.tpl.tables === "undefined" || res.tpl.tables == null || res.tpl.tables.length === 0)
                return error(res,"Missing tables",500);

            if(req.body.tableId != null)
            {
                if(!res.tpl.tables.some(t=>t.id == req.body.tableId))
                    return error(res,"Wrong table Id",400);
                var query = {$and:[{_tableId:sanitize(req.body.tableId)},{status:OrderStatus.Open}]};
                if(Order._id != null)
                    query.$and.push({_id:{$ne:Order._id}});
                var openOrder = await OrderModel.find(query).exec();
                if(openOrder && openOrder.length>0)
                    return error(res,"There is an open order for this table",400);
            }


            Order._tableId = sanitize(req.body.tableId);
            Order.type = "Local";
            req.body.orderItems.forEach(function (item) {
                var orderedItem = CartItemDto.constructFromObject(item);
                if (typeof orderedItem.menuItemId === "undefined" || orderedItem.menuItemId.length === 0 ||
                    typeof orderedItem.amount === "undefined")
                    return error(res,"Invalid orderItem data",400);
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
            if (err)
                return error(res,"Error DB during saving order to DB",500,err);

            return next();
        });
    };
};

