var authMW = require('../middlewares/generic/Auth');
var listWaitersMW = require('../middlewares/admin/listWaiters');
var checkIfUserRegisteredMW = require('../middlewares/user/checkIfUserRegistered');
var addWaiterMW = require('../middlewares/admin/addWaiter');
var getWaiterMW = require('../middlewares/admin/getWaiter');
var deleteWaiterMW = require('../middlewares/admin/deleteWaiter');
var responseJSON = require('../middlewares/generic/responseJSON');

var userModel = require('../models/User');
var Role = require('../models/Roles');

module.exports = function(app){
    var objectRepository = {
        userModel: userModel,
    };

    //get waiters
    app.route("/admin/waiter").get(
        authMW(objectRepository,Role.Admin, true),
        listWaitersMW(objectRepository),
        responseJSON(objectRepository)
    );

    //register waiter
    app.route("/admin/waiter").post(
        authMW(objectRepository,Role.Admin, true),
        checkIfUserRegisteredMW(objectRepository),
        addWaiterMW(objectRepository)
    );

    //delete waiter
    app.route("/admin/waiter/:userId").delete(
        authMW(objectRepository,Role.Admin, true),
        getWaiterMW(objectRepository),
        deleteWaiterMW(objectRepository)
    );
};