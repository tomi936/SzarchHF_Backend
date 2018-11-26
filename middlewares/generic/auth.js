const error = require('../../helpers/errorHandler');
module.exports = function (objectrepository, requiredLevel, isExclusive) {

  return function (req, res, next) {
      if(typeof req.user === "undefined")
          return error(res,"Unauthorized",401);

      if(isExclusive)
      {
          if(req.user.role !== requiredLevel)
              return error(res,"Unauthorized",401);
      }
      else
      {
          if(req.user.role < requiredLevel)
              return error(res,"Unauthorized",401);
      }
    return next();
  };

};
