var requireOption = require('../common').requireOption;
const error = require('../../helpers/errorHandler');


module.exports = function (objectrepository) {

    return function (req, res, next) {
        if(typeof res.tpl.order === "undefined" || res.tpl.order === null)
            error(res,"Cant find order",400);
        if(typeof req.body === "undefined"|| Object.keys(req.body).length === 0 || typeof req.body.rating === "undefined")
            error(res,"Incomplete rate data",400);

        var rating = parseInt(req.body.rating);
        if(rating<1 || rating >5)
            error(res,"Wrong rat value",400);

        res.tpl.order.rating = rating;

        res.tpl.order.save(function (err){
            if(err)
                error(res,"DB Error during saving rating",500,err);
            return next();
        });

    };
};

