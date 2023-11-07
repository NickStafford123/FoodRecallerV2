const { expressjwt: expressJwt } = require('express-jwt')

const JWT_SECRET = process.env.JWT_SECRET || 'Mindy_123'

const isAuthenticated = expressJwt({
    secret: JWT_SECRET,
    algorithms: ['HS256'],
    userProperty: 'auth',
})

module.exports = isAuthenticated