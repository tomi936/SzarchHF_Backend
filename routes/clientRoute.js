var authMW = require('../middlewares/generic/Auth');
var listFreeTablesMW = require('../middlewares/reservation/listFreeTables');
var getTablesMW = require('../middlewares/reservation/getTables');
var listReservationsMW = require('../middlewares/reservation/listReservations');
var getReservationMW = require('../middlewares/reservation/getReservation');
var createReservationMW = require('../middlewares/reservation/createReservation');
var deleteReservationMW = require('../middlewares/reservation/deleteReservation');
var validateReservationMW = require('../middlewares/reservation/validateReservation');
var listOrdersMW = require('../middlewares/order/listOrders');
var getOrderByIdMW = require('../middlewares/order/getOrderById');
var updateOrdernMW = require('../middlewares/order/updateOrder');
var finishOrderMW = require('../middlewares/order/finishOrder');
var rateOrderMW = require('../middlewares/order/rateOrder');
var listMenuItemsMW = require('../middlewares/menu/listMenuItems');
var getCartMW = require('../middlewares/order/getCart');
var updateCartMW = require('../middlewares/order/updateCart');
var responseJSON = require('../middlewares/generic/responseJSON');
var getUserMW = require('../middlewares/user/getUser');

var userModel = require('../models/User');
var Role = require('../models/Roles');
var tableModel = require('../models/Table');
var reservationModel = require('../models/Reservation');
var orderModel = require('../models/Order');
var orderStatus = require('../models/OrderStatus');
var reservationStatus = require('../models/ReservationStatus');
var menuItemModel = require('../models/MenuItems');
var cartModel = require('../models/Cart');
var tableDto = require('../dtos/TableDto');
var reservationDto = require('../dtos/ReservationDto');
var orderDto = require('../dtos/OrderDto');
var orderRequestDto = require('../dtos/OrderRequestDto');
var ratingDto = require('../dtos/RatingDto');
var cartItemDto = require('../dtos/CartItemDto');
var menuItemDto = require('../dtos/MenuItemDto');

module.exports = function (app) {

    var objectRepository = {
        userModel: userModel,
        tableModel: tableModel,
        reservationModel: reservationModel,
        reservationStatus:reservationStatus,
        orderModel: orderModel,
        orderStatus:orderStatus,
        menuItemModel: menuItemModel,
        cartModel: cartModel,
        tableDto: tableDto,
        reservationDto: reservationDto,
        orderDto: orderDto,
        orderRequestDto: orderRequestDto,
        ratingDto: ratingDto,
        cartItemDto: cartItemDto,
        menuItemDto: menuItemDto,
        Role:Role
    };

    //Search free table
    app.route("/client/searchForTable").get(
        authMW(objectRepository, Role.Client, false),
        getTablesMW(objectRepository),
        listFreeTablesMW(objectRepository),
        responseJSON(objectRepository)
    );

    //Get client reservations
    app.route("/client/reservation").get(
        authMW(objectRepository, Role.Client, true),
        listReservationsMW(objectRepository),
        responseJSON(objectRepository)
    );

    //Make reservation
    app.route("/client/reservation").post(
        authMW(objectRepository, Role.Client, true),
        getTablesMW(objectRepository),
        validateReservationMW(objectRepository),
        createReservationMW(objectRepository),
        function (req, res, next) {
            return res.status(200).json();
        }
    );

    //delete reservation by client
    app.route("/client/reservation/:reservationId").delete(
        authMW(objectRepository, Role.Client, true),
        getReservationMW(objectRepository),
        deleteReservationMW(objectRepository),
        function (req, res, next) {
            return res.status(200).json();
        }
    );

    //get orders
    app.route("/client/order").get(
        authMW(objectRepository, Role.Client, true),
        listOrdersMW(objectRepository),
        responseJSON(objectRepository)
    );

    //make order
    app.route("/client/order").post(
        authMW(objectRepository, Role.Client, true),
        listMenuItemsMW(objectRepository),
        getUserMW(objectRepository),
        updateOrdernMW(objectRepository),
        finishOrderMW(objectRepository),
        function (req, res, next) {
            return res.status(200).json();
        }
    );

    //rate order
    app.route("/client/rate").post(
        authMW(objectRepository, Role.Client, true),
        getOrderByIdMW(objectRepository),
        rateOrderMW(objectRepository),
        function (req, res, next) {
            return res.status(200).json();
        }
    );

    //get menu
    app.route("/client/menu").get(
        authMW(objectRepository, Role.Client, false),
        listMenuItemsMW(objectRepository),
        responseJSON(objectRepository)
    );

    // get cart
    app.route("/client/cart").get(
        authMW(objectRepository, Role.Client, true),
        getCartMW(objectRepository),
        responseJSON(objectRepository)
    );

    // update cart
    app.route("/client/cart").put(
        authMW(objectRepository, Role.Client, true),
        getCartMW(objectRepository),
        updateCartMW(objectRepository),
        function (req, res, next) {
            return res.status(200).json();
        }
    );


};