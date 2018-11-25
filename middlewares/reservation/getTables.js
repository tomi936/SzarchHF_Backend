var requireOption = require('../common').requireOption;


module.exports = function (objectrepository) {

    var TableModel = requireOption(objectrepository, 'tableModel');

    return function (req, res, next) {


        TableModel.find({},function (err, result) {
            if (err || !result) {
                res.tpl.error = "Can't load tables";
                console.log(res.tpl.error);
                return res.sendStatus(400);
            }

            res.tpl.tables = result;
            return next();
        });

    };
};

