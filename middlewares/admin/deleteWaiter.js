
const error = require('../../helpers/errorHandler');
module.exports = function (objectrepository) {

    return function (req, res, next) {
        if(typeof res.tpl.waiter === "undefined" || res.tpl.waiter === null)
            error(res,"Cant find waiter profile",400);

        res.tpl.waiter.remove(function (err) {
            if (err)
                error(res,"Error DB during removing waiter from DB",500,err);

            return next();
        });
    };
}

