const config = require('../../config/jwtconfig.json');
//const jwt = require('jsonwebtoken');



/**
 * If the user is not logged in, redirects to /
 */
module.exports = function (objectrepository, requiredLevel, isExclusive) {

  return function (req, res, next) {
    console.log("authMW");

    //var token = getTokenfromHeaderOrQuerystring(req);

      // verify a token symmetric
      /*jwt.verify(token, 'shhhhh', function(err, decoded) {
          if(err)
              return res.sendStatus(401);

          console.log(decoded);

          res.tpl.user = {
              id : decoded.sub,
              name : decoded.name,
              role : Number(decoded.role)
          };*/

      console.log(req.user);
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
      /*});*/
    return next();
  };

};

function getTokenfromHeaderOrQuerystring (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        return req.query.token;
    }
    return null;
}
