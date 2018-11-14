module.exports = function (app) {

    app.route("/waiter/reservation").get(function (req,res,next) {
        res.send("Waiter List");
    });

    app.route("/waiter/reservation").post(function (req,res,next) {
        res.send("Waiter List");
    });

    app.route("/waiter/reservation").put(function (req,res,next) {
        res.send("Waiter List");
    });

    app.route("/waiter/reservation/:reservationId").delete(function (req,res,next) {
        res.send("Waiter List");
    });

    app.route("/waiter/order").get(function (req,res,next) {
        res.send("Waiter List");
    });

    app.route("/waiter/order-by-table/:tableId").get(function (req,res,next) {
        res.send("Waiter List");
    });

    app.route("/waiter/order-by-table/:tableId").put(function (req,res,next) {
        res.send("Waiter List");
    });

    app.route("/waiter/order-by-id/:orderId/finish").get(function (req,res,next) {
        res.send("Waiter List");
    });

    app.route("/waiter/order-by-id/:orderId/receipt").get(function (req,res,next) {
        res.send("Waiter List");
    });

    app.route("/waiter/order-by-id/:orderId").get(function (req,res,next) {
        res.send("Waiter List");
    });

    app.route("/waiter/order-by-id/:orderId").delete(function (req,res,next) {
        res.send("Waiter List");
    });

};