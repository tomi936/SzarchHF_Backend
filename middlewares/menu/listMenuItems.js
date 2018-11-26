var requireOption = require('../common').requireOption;
const error = require('../../helpers/errorHandler');


module.exports = function (objectrepository) {

    var MenuItemModel = requireOption(objectrepository, 'menuItemModel');
    var MenuItemDto = requireOption(objectrepository, 'menuItemDto');

    return function (req, res, next) {
        MenuItemModel.find({},function (err,result) {
            if(err || !result)
                error(res,"Can't load menu",500,err);


            res.tpl.resObj=[];
            if(result.length>0) {
                result.forEach(function (item) {
                    res.tpl.resObj.push(MenuItemDto.constructFromObject(item.toObject()));
                });
            }
            res.tpl.menuItems = res.tpl.resObj;
            return next();
        });

    };
};

