const { Router } = require('express');
const { check } = require('express-validator');
const { revisarValidaciones } = require('../middlewares/revisarValidaciones');

const {
    verifyToken,
    isAdmin,
    userValidate,
    checkRolesExisted,
    checkDuplicateUsernameOrEmail
} = require('../middlewares');

const { signUp } = require('../controllers/auth');

const router = Router();

router.post('/', [
    verifyToken,
    isAdmin,
    check('username', 'Required username').not().isEmpty().escape().trim(),
    check('email', 'Required email').isEmail().not().isEmpty().escape().trim(),
    check('password', 'Required password').not().isEmpty().escape().trim(),
    check('password', 'the password must be at least 6 characters long').isLength({ min: 6 }),
    check('confirm', 'Confirm password').not().isEmpty().escape().trim(),
    checkRolesExisted,
    checkDuplicateUsernameOrEmail,
    userValidate
],
revisarValidaciones,
signUp)

module.exports = router;