var requireOption = require('../common').requireOption;


module.exports = function (objectrepository) {

    return function (req, res, next) {
        if(typeof res.tpl.order === "undefined" || res.tpl.order === null)
        {
            res.tpl.error = "Cant find order model";
            console.log(res.tpl.error);
            return res.sendStatus(400);
        }
        if(typeof req.body === "undefined"|| Object.keys(req.body).length === 0 || typeof req.body.rating === "undefined")
        {
            res.tpl.error = "Missing order model";
            console.log(res.tpl.error);
            return res.sendStatus(400);
        }

        var rating = parseInt(req.body.rating);
        if(rating<1 || rating >5)
        {
            res.tpl.error = "Wrong rate";
            console.log(res.tpl.error);
            return res.sendStatus(400);
        }

        res.tpl.order.rating = rating;

        res.tpl.order.save(function (err){
            if(err)
            {
                res.tpl.error = "Can't save rating";
                console.log(res.tpl.error);
                return res.sendStatus(400);
            }
            return next();
        });

    };
};

