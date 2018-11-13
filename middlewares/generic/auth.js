const config = require('/config/jwtconfig.json');
const jwt = require('jsonwebtoken');


const users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];

/**
 * If the user is not logged in, redirects to /
 */
module.exports = function (objectrepository) {

  return function (req, res, next) {
    console.log("authMW");
      const user = users.find(u => u.username === username && u.password === password);
      if (user) {
          const token = jwt.sign({ sub: user.id }, config.secret);
          const { password, ...userWithoutPassword } = user;
          return {
              ...userWithoutPassword,
              token
          };
      }
    return next();
  };

};
