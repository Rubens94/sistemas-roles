const { validationResult } = require('express-validator');

const revisarValidaciones = async(req, res, next) => {
    const errors = await validationResult(req)
    if (!errors.isEmpty()) {
      return await res.status(422).json({ errors: errors.array() })
    } else {
        next();
    }
}

module.exports = {
    revisarValidaciones
}