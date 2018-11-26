var requireOption = require('../common').requireOption;
const error = require('../../helpers/errorHandler');


module.exports = function (objectrepository) {

    var OrderStatus = requireOption(objectrepository, 'orderStatus');

    return function (req, res, next) {
        if(typeof res.tpl.order === "undefined" || res.tpl.order === null)
            error(res,"Cant find order model",400);
        if(res.tpl.order.status === OrderStatus.Closed)
            error(res,"Cant finish closed order",400);

        res.tpl.order.status = OrderStatus.Finished;
        res.tpl.order.save(function (err) {
            if (err)
                error(res,"Error DB during saving order to DB",500,err);

            return next();
        });

    };
};

