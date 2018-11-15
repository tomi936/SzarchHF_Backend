var requireOption = require('../common').requireOption;

const users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];

module.exports = function (objectrepository) {

    var UserModel = requireOption(objectrepository, 'userModel');

    return function (req, res, next) {
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
}

