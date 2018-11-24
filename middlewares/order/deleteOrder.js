module.exports = function (objectrepository) {
    return function (req, res, next) {
        if(typeof res.tpl.order === "undefined" || res.tpl.order === null)
        {
            res.tpl.error = "Cant find order model";
            console.log(res.tpl.error);
            return res.sendStatus(400);
        }

        res.tpl.order.remove(function (err) {
            if (err) {
                res.tpl.error = "Error DB during removing order from DB";
                console.log(res.tpl.error);
                return res.sendStatus(500);
            }

            return next();
        });
    };
};

