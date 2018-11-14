const config = require('/config/jwtconfig.json');
const jwt = require('jsonwebtoken');



/**
 * If the user is not logged in, redirects to /
 */
module.exports = function (objectrepository, requiredLevel, isExclusive) {

  return function (req, res, next) {
    console.log("authMW");

    return next();
  };

};
