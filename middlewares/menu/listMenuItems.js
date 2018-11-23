var requireOption = require('../common').requireOption;


module.exports = function (objectrepository) {

    var MenuItemModel = requireOption(objectrepository, 'menuItemModel');
    var MenuItemDto = requireOption(objectrepository, 'menuItemDto');

    return function (req, res, next) {
        MenuItemModel.find({},function (err,result) {
            if(err || !result)
            {
                res.tpl.error = "Can't load menu";
                console.log(res.tpl.error);
                return res.status(400).json(res.tpl.error);
            }

            res.tpl.resObj=[];
            if(result.length>0) {
                result.forEach(function (item) {
                    res.tpl.resObj.push(MenuItemDto.constructFromObject(item.toObject()));
                });
            }
            res.tpl.menuItems = resObj;
            return next();
        });

    };
};

