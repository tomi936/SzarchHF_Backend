module.exports = function (objectrepository) {

    return function (req, res, next) {
        if(typeof res.tpl.waiter === "undefined" || res.tpl.waiter === null)
        {
            res.tpl.error = "Cant find waiter profile";
            console.log(res.tpl.error);
            return res.sendStatus(400);
        }

        res.tpl.waiter.remove(function (err) {
            if (err) {
                res.tpl.error = "Error DB during removing waiter from DB";
                console.log(res.tpl.error);
                return res.sendStatus(500);
            }

            return next();
        });
    };
}

