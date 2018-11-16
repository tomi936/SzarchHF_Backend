const config = require('../../config/jwtconfig.json');
//const jwt = require('jsonwebtoken');



/**
 * If the user is not logged in, redirects to /
 */
module.exports = function (objectrepository, requiredLevel, isExclusive) {

  return function (req, res, next) {
    console.log("authMW");
      if(typeof req.user === "undefined")
          return res.sendStatus(401);

      if(isExclusive)
      {
          if(req.user.role !== requiredLevel)
              return res.sendStatus(401);
      }
      else
      {
          if(req.user.role < requiredLevel)
              return res.sendStatus(401);
      }
    return next();
  };

};
