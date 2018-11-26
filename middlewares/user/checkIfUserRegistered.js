var requireOption = require('../common').requireOption;
const sanitize = require('mongo-sanitize');
const error = require('../../helpers/errorHandler');


module.exports = function (objectrepository) {

    var UserModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {
        console.log("checkIfUserRegistered");
        if(typeof req.body === "undefined" || Object.keys(req.body).length === 0 || typeof req.body.email === "undefined")
            error(res,"User data is empty",400);


        UserModel.find({email: sanitize(req.body.email)}, function (err,result) {
           if(err)
               error(res,"DB error at checking registered Users",500,err);

           if(result.length>0)
               error(res,"Already registered",409);

            return next();
        });
    };
};

