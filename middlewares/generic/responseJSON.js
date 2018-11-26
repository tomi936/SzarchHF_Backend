const error = require('../../helpers/errorHandler');
module.exports = function (objectrepository) {
    return function (req, res, next) {
        if(typeof res.tpl.resObj !== "undefined" )
            return res.json(res.tpl.resObj);

        return error(res,"resObj is empty",500);
    };
};

