var authMW = require('../middlewares/generic/Auth');
var listReservationsMW = require('../middlewares/reservation/listReservations');
var getReservationMW = require('../middlewares/reservation/getReservation');
var createReservationMW = require('../middlewares/reservation/createReservation');
var updateReservationMW = require('../middlewares/reservation/updateReservation');
var deleteReservationMW = require('../middlewares/reservation/deleteReservation');
var validateReservationMW = require('../middlewares/reservation/validateReservation');
var listOrdersMW = require('../middlewares/order/listOrders');
var getOrderByIdMW = require('../middlewares/order/getOrderById');
var getOrderByTableMW = require('../middlewares/order/getOrderByTable');
var updateOrdernMW = require('../middlewares/order/updateOrder');
var deleteOrderMW = require('../middlewares/order/deleteOrder');
var finishOrderMW = require('../middlewares/order/finishOrder');
var getReceiptMW = require('../middlewares/order/getReceipt');
var responseJSON = require('../middlewares/generic/responseJSON');

var userModel = require('../models/user');
var tableDto = require('../dtos/TableDto');
var reservationDto = require('../dtos/ReservationDto');
var orderDto = require('../dtos/OrderDto');
var orderRequestDto = require('../dtos/OrderRequestDto');
var ratingDto = require('../dtos/RatingDto');
var cartItemDto = require('../dtos/CartItemDto');

module.exports = function(app){

    var objectRepository = {
        userModel: userModel,
        tableDto: tableDto,
        reservationDto: reservationDto,
        orderDto:orderDto,
        orderRequestDto:orderRequestDto,
        ratingDto: ratingDto,
        cartItemDto:cartItemDto
    };

    //get waiter reservations
    app.route("/waiter/reservation").get(
        authMW(objectRepository,userModel.Role.Waiter, true),
        listReservationsMW(objectRepository),
        responseJSON(objectRepository)
    );

    //make reservation by waiter
    app.route("/waiter/reservation").post(
        authMW(objectRepository,userModel.Role.Waiter, true),
        validateReservationMW(objectRepository),
        createReservationMW(objectRepository),
        );

    //update reservation
    app.route("/waiter/reservation").put(
        authMW(objectRepository,userModel.Role.Waiter, true),
        getReservationMW(objectRepository),
        validateReservationMW(objectRepository),
        updateReservationMW(objectRepository),
    );

    //delete reservation by waiter
    app.route("/waiter/reservation/:reservationId").delete(
        authMW(objectRepository,userModel.Role.Waiter, true),
        getReservationMW(objectRepository),
        deleteReservationMW(objectRepository)
    );

    //get waiter orders
    app.route("/waiter/order").get(
        authMW(objectRepository,userModel.Role.Waiter, true),
        listOrdersMW(objectRepository),
        responseJSON(objectRepository)
    );

    //get waiter order by table
    app.route("/waiter/order-by-table/:tableId").get(
        authMW(objectRepository,userModel.Role.Waiter, true),
        getOrderByTableMW(objectRepository),
        responseJSON(objectRepository)
    );

    //update order by table
    app.route("/waiter/order-by-table/:tableId").put(
        authMW(objectRepository,userModel.Role.Waiter, true),
        getOrderByTableMW(objectRepository),
        updateOrdernMW(objectRepository)
    );

    //finish order
    app.route("/waiter/order-by-id/:orderId/finish").get(
        authMW(objectRepository,userModel.Role.Waiter, true),
        getOrderByIdMW(objectRepository),
        finishOrderMW(objectRepository)
    );

    //get order receipt
    app.route("/waiter/order-by-id/:orderId/receipt").get(
        authMW(objectRepository,userModel.Role.Waiter, true),
        getOrderByIdMW(objectRepository),
        getReceiptMW(objectRepository)
    );

    //get waiter order
    app.route("/waiter/order-by-id/:orderId").get(
        authMW(objectRepository,userModel.Role.Waiter, true),
        getOrderByIdMW(objectRepository),
        responseJSON(objectRepository)
    );

    //delete order by waiter
    app.route("/waiter/order-by-id/:orderId").delete(
        authMW(objectRepository,userModel.Role.Waiter, true),
        getOrderByIdMW(objectRepository),
        deleteOrderMW(objectRepository)
    );

};