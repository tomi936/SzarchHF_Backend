module.exports = function (app) {

    app.route("/admin/waiter").get(function (req,res,next) {
        res.send("Waiter List");
    });

    app.route("/admin/waiter").post(function (req,res,next) {
        res.send("Add new waiter");
    });

    app.route("/admin/waiter/:userId").delete(function (req,res,next) {
        res.send("Waiter List");
    });
};