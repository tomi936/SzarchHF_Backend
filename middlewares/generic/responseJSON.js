module.exports = function (objectrepository) {
    return function (req, res, next) {
        console.log("responseJSONMW");
        if(typeof res.tpl.resObj !== "undefined" )
            return res.json(res.tpl.resObj);

        return res.sendStatus(500);
    };
};

