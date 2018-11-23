var requireOption = require('../common').requireOption;


module.exports = function (objectrepository) {

    var OrderModel = requireOption(objectrepository, 'orderModel');

    return function (req, res, next) {
        if(typeof req.body === "undefined"|| Object.keys(req.body).length === 0 || typeof req.body.orderId === "undefined")
        {
            res.tpl.error = "No orderId";
            console.log(res.tpl.error);
            return res.status(400).json(res.tpl.error);
        }

        OrderModel.findOne({_id:req.body.orderId}, function (err, result) {
            if(err)
            {
                res.tpl.error = "DB error during finding order";
                console.log(res.tpl.error);
                return res.status(400).json(res.tpl.error);
            }

            res.tpl.order = result;
            return next();
        });
    };
};

