/**
 * If the user is logged in, redirects to /
 */
module.exports = function (objectrepository) {

  return function (req, res, next) {
    console.log("inverseAuthMW");
      if(typeof req.user !== "undefined") {
        res.tpl.error = "Already loged in!";
        res.status(400).json(JSON.stringify(res.tpl.error));
      }
    return next();
  };

};
