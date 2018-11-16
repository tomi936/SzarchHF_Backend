var requireOption = require('../common').requireOption;
const sanitize = require('mongo-sanitize');


module.exports = function (objectrepository) {

    var UserModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {
        console.log("checkIfUserRegistered");
        if(typeof req.body === "undefined" || typeof req.body.email === "undefined")
        {
            res.tpl.error = "User data is empty";
            console.log(res.tpl.error);
            res.status(400).json(res.tpl.error);
        }

        UserModel.find({email: sanitize(req.body.email)}, function (err,result) {
           if(err)
           {
               res.tpl.error = "DB error";
               console.log(res.tpl.error);
               return res.status(500).json(res.tpl.error);
           }

           console.log(result);
           console.log(result.length);
           if(result.length>0)
               return res.sendStatus(409);

            return next();
        });
    };
};

