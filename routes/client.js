module.exports = function(app){

    app.route("/client/searchForTable").get(function (req,res,next) {
        res.send("");
    });

    app.route("/client/reservation").get(function (req,res,next) {
        res.send("");
    });

    app.route("/client/reservation").post(function (req,res,next) {
        res.send("");
    });

    app.route("/client/reservation/:reservationId").delete(function (req,res,next) {
        res.send("");
    });

    app.route("/client/order").get(function (req,res,next) {
        res.send("");
    });

    app.route("/client/order").post(function (req,res,next) {
        res.send("");
    });

    app.route("/client/rate").post(function (req,res,next) {
        res.send("");
    });

    app.route("/client/menu").get(function (req,res,next) {
        res.send("");
    });

    app.route("/client/cart").get(function (req,res,next) {
        res.send("");
    });

    app.route("/client/cart").put(function (req,res,next) {
        res.send("");
    });


};