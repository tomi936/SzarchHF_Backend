var requireOption = require('../common').requireOption;
const error = require('../../helpers/errorHandler');

module.exports = function (objectrepository) {

    var UserRole = requireOption(objectrepository, 'Role');

    return function (req, res, next) {
        if(typeof res.tpl.order === "undefined" || res.tpl.order === null)
            return error(res,"Cant find order model",400);


        /*if (req.user.role === UserRole.Waiter && res.tpl.order.owner !== req.user.id) {
            res.tpl.error = "Can't delete another one's order ";
            console.log(res.tpl.error);
            return res.sendStatus(401);
        }*/
        res.tpl.order.remove(function (err) {
            if (err)
                error(res,"Error DB during removing order from DB",500,err);

            return next();
        });
    };
};

