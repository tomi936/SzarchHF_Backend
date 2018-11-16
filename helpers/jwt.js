const expressJwt = require('express-jwt');
const config = require('../config/jwtconfig.json');

module.exports = jwt;

function jwt() {
    console.log("jwt");
    const secret = config.secret;
    return  expressJwt({ secret:secret, getToken: function fromHeaderOrQuerystring (req) {
            if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
                return req.headers.authorization.split(' ')[1];
            } else if (req.query && req.query.token) {
                return req.query.token;
            }
            return null;
        } }).unless({
        path: [
            // public routes that don't require authentication
            '/user/login',
            '/user/register'
        ]
    });
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};
