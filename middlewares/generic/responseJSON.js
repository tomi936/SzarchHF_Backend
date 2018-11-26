module.exports = function (objectrepository) {
    return function (req, res, next) {
        if(typeof res.tpl.resObj !== "undefined" )
            return res.json(res.tpl.resObj);

        return res.sendStatus(500);
    };
};

