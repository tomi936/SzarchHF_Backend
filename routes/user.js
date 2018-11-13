module.exports = function(app){

  app.route("/user/login").post(function (req,res,next) {
      res.send("");
  });

  app.route("/user/").post(function (req,res,next) {
     res.send("");
  });

  app.route("/user/").put(function (req,res,next) {
     res.send("");
  });

  app.route("/user/").get(function (req,res,next) {
     res.send("");
  });
};