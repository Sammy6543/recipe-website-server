const route = require('express').Router();
const { userRegister, userLogin, getMe } = require('../controllers/userController')
const { signupValidation, loginValidation } = require('../middleware/AuthValidation')
const auth = require('../middleware/Auth')
const { upload, uploadToCloudinary } = require('../middleware/upload')

route.post('/register', upload.single("profilePicture"), uploadToCloudinary, signupValidation, userRegister)
route.post('/login', loginValidation, userLogin)
route.get('/me/:id', auth, getMe)


module.exports = route;   