var requireOption = require('../common').requireOption;
const error = require('../../helpers/errorHandler');


module.exports = function (objectrepository) {

    var TableModel = requireOption(objectrepository, 'tableModel');
    var TableDto = requireOption(objectrepository, 'tableDto');

    return function (req, res, next) {


        TableModel.find({},function (err, result) {
            if (err || !result)
                return error(res,"Can't load tables",500,err);


            res.tpl.resObj = [];
            if(result)
            {
                result.forEach(function (item) {
                    var tItem = TableDto.constructFromObject(item.toObject());
                    res.tpl.resObj.push(tItem);
                });
            }
            res.tpl.tables = result;
            return next();
        });

    };
};

