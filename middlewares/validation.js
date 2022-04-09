const HTTP_STATUS_CODES = require("../libs/constants");

const validateBody = (shema) => async(req, res, next) => {
    try {
        await shema.validateAsync(req.body);
        next();
    } catch (err) {
        return res
            .status(400)
            .json({
                status: 'error',
                code: HTTP_STATUS_CODES.BAD_REQUEST,
                message: err.message
            });
    }
}

const validateParams = (shema) => async(req, res, next) => {
    try {
        await shema.validateAsync(req.params);
        next();
    } catch (err) {
        return res
            .status(400)
            .json({
                status: 'error',
                code: HTTP_STATUS_CODES.BAD_REQUEST,
                message: err.message
            });
    }
}

module.exports = {
    validateBody,
    validateParams
}