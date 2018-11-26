var requireOption = require('../common').requireOption;


module.exports = function (objectrepository) {

    var OrderStatus = requireOption(objectrepository, 'orderStatus');

    return function (req, res, next) {
        if(typeof res.tpl.order === "undefined" || res.tpl.order === null)
        {
            res.tpl.error = "Cant find order model";
            console.log(res.tpl.error);
            return res.sendStatus(400);
        }

        if(res.tpl.order.status === OrderStatus.Open)
        {
            res.tpl.error = "Cant print unfinished receipt";
            console.log(res.tpl.error);
            return res.sendStatus(400);
        }

        res.tpl.order.status = OrderStatus.Closed;
        res.tpl.order.save(function (err) {
            if (err) {
                res.tpl.error = "Error DB during saving order to DB";
                console.log(res.tpl.error);
                return res.status(500).json(res.tpl.error);
            }

            return res.sendStatus(200);
        });
    };
}

