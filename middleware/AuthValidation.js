const Joi = require('joi');

// SignUp
const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(100).required(),

        email: Joi.string().email().required(),

        password: Joi.string().min(4).max(100).required(),
    });
    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ msg: "Bad Request", error })
    }
    next();
}

// LogIn
const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),

        password: Joi.string().min(4).max(100).required()
    });
    const { error } = schema.validate(req.body);

    if (error) {
        return res.status(400).json({ msg: "Bad Request", error });
    }
    next();
}

module.exports = { signupValidation, loginValidation }