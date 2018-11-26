var authMW = require('../middlewares/generic/Auth');
var listReservationsMW = require('../middlewares/reservation/listReservations');
var getReservationMW = require('../middlewares/reservation/getReservation');
var createReservationMW = require('../middlewares/reservation/createReservation');
var updateReservationMW = require('../middlewares/reservation/updateReservation');
var deleteReservationMW = require('../middlewares/reservation/deleteReservation');
var validateReservationMW = require('../middlewares/reservation/validateReservation');
var getTablesMW = require('../middlewares/reservation/getTables');
var listOrdersMW = require('../middlewares/order/listOrders');
var getOrderByIdMW = require('../middlewares/order/getOrderById');
var getOrderByTableMW = require('../middlewares/order/getOrderByTable');
var updateOrdernMW = require('../middlewares/order/updateOrder');
var deleteOrderMW = require('../middlewares/order/deleteOrder');
var finishOrderMW = require('../middlewares/order/finishOrder');
var getReceiptMW = require('../middlewares/order/getReceipt');
var responseJSON = require('../middlewares/generic/responseJSON');
var listMenuItemsMW = require('../middlewares/menu/listMenuItems');

var userModel = require('../models/User');
var Role = require('../models/Roles');
var tableModel = require('../models/Table');
var reservationModel = require('../models/Reservation');
var reservationStatus = require('../models/ReservationStatus');
var orderModel = require('../models/Order');
var orderStatus = require('../models/OrderStatus');
var menuItemModel = require('../models/MenuItems');
var cartModel = require('../models/Cart');
var tableDto = require('../dtos/TableDto');
var reservationDto = require('../dtos/ReservationDto');
var orderDto = require('../dtos/OrderDto');
var orderRequestDto = require('../dtos/OrderRequestDto');
var ratingDto = require('../dtos/RatingDto');
var cartItemDto = require('../dtos/CartItemDto');
var menuItemDto = require('../dtos/MenuItemDto');

module.exports = function(app){

    var objectRepository = {
        userModel: userModel,
        tableModel:tableModel,
        reservationModel:reservationModel,
        reservationStatus:reservationStatus,
        orderModel:orderModel,
        orderStatus:orderStatus,
        menuItemModel:menuItemModel,
        cartModel:cartModel,
        tableDto: tableDto,
        reservationDto: reservationDto,
        orderDto:orderDto,
        orderRequestDto:orderRequestDto,
        ratingDto: ratingDto,
        cartItemDto:cartItemDto,
        Role:Role,
        menuItemDto:menuItemDto
    };

    //get waiter reservations
    app.route("/waiter/reservation").get(
        authMW(objectRepository,Role.Waiter, true),
        listReservationsMW(objectRepository),
        responseJSON(objectRepository)
    );

    //make reservation by waiter
    app.route("/waiter/reservation").post(
        authMW(objectRepository,Role.Waiter, true),
        getTablesMW(objectRepository),
        validateReservationMW(objectRepository),
        createReservationMW(objectRepository),
        function (req, res, next) {
            return res.status(200).json();
        }
        );

    //update reservation
    app.route("/waiter/reservation").put(
        authMW(objectRepository,Role.Waiter, true),
        getTablesMW(objectRepository),
        getReservationMW(objectRepository),
        validateReservationMW(objectRepository),
        updateReservationMW(objectRepository),
        function (req, res, next) {
            return res.status(200).json();
        }
    );

    //delete reservation by waiter
    app.route("/waiter/reservation/:reservationId").delete(
        authMW(objectRepository,Role.Waiter, true),
        getReservationMW(objectRepository),
        deleteReservationMW(objectRepository),
        function (req, res, next) {
            return res.status(200).json();
        }
    );

    //get waiter orders
    app.route("/waiter/order").get(
        authMW(objectRepository,Role.Waiter, true),
        listOrdersMW(objectRepository),
        responseJSON(objectRepository)
    );

    //update order
    app.route("/waiter/order/").put(
        authMW(objectRepository,Role.Waiter, true),
        listMenuItemsMW(objectRepository),
        getTablesMW(objectRepository),
        getOrderByIdMW(objectRepository),
        updateOrdernMW(objectRepository),
        function (req, res, next) {
            return res.status(200).json();
        }
    );

    //get waiter order by table
    app.route("/waiter/order-by-table/:tableId").get(
        authMW(objectRepository,Role.Waiter, true),
        getOrderByTableMW(objectRepository),
        responseJSON(objectRepository)
    );

    //finish order
    app.route("/waiter/order-by-id/:orderId/finish").get(
        authMW(objectRepository,Role.Waiter, true),
        getOrderByIdMW(objectRepository),
        finishOrderMW(objectRepository),
        function (req, res, next) {
            return res.status(200).json();
        }
    );

    //get order receipt
    app.route("/waiter/order-by-id/:orderId/receipt").get(
        authMW(objectRepository,Role.Waiter, true),
        getOrderByIdMW(objectRepository),
        listMenuItemsMW(objectRepository),
        getReceiptMW(objectRepository)
    );

    //get waiter order
    app.route("/waiter/order-by-id/:orderId").get(
        authMW(objectRepository,Role.Waiter, true),
        getOrderByIdMW(objectRepository),
        responseJSON(objectRepository)
    );

    //list tables
    app.route("/waiter/tables").get(
        authMW(objectRepository,Role.Waiter, true),
        getTablesMW(objectRepository),
        function(req,res,next){res.tpl.resObj = res.tpl.tables; return next();},
        responseJSON(objectRepository)
    );

    //delete order by waiter
    app.route("/waiter/order-by-id/:orderId").delete(
        authMW(objectRepository,Role.Waiter, true),
        getOrderByIdMW(objectRepository),
        deleteOrderMW(objectRepository),
        function (req, res, next) {
            return res.status(200).json();
        }
    );

};