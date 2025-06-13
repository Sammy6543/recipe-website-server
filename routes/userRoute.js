const route = require('express').Router();
const { userRegister, userLogin, getMe } = require('../controllers/userController')
// const { signupValidation, loginValidation } = require('../middleware/AuthValidation')
const auth = require('../middleware/Auth')

route.post('/register', userRegister)
route.post('/login', userLogin)
route.get('/me/:id', getMe)

module.exports = route;   