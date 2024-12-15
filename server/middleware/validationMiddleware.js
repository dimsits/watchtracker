const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // Extract error messages
        const extractedErrors = [];
        errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));

        return res.status(422).json({
            errors: extractedErrors,
        });
    }
    next();
};

module.exports = validate;
