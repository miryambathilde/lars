const isIp = require('is-ip');
const fsp = require('fs').promises;
const fs = require('fs');
exports.validateIP = (req, res, next) => {
    if(isIp(req.query.ip) !== true) {
        return res.status(404).json({
            status: 'fail',
            data: {
                message: 'Invalid IP, not found.'
            }
        })
    }
    next();
}