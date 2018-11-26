var requireOption = require('../common').requireOption;
const error = require('../../helpers/errorHandler');


module.exports = function (objectrepository) {

    var TableModel = requireOption(objectrepository, 'tableModel');

    return function (req, res, next) {


        TableModel.find({},function (err, result) {
            if (err || !result)
                error(res,"Can't load tables",500,err);

            res.tpl.tables = result;
            return next();
        });

    };
};

