const { Router } = require('express');
const { check } = require('express-validator');
const { signUp, signIn } = require('../controllers/auth');

const { 
    checkDuplicateUsernameOrEmail, 
    checkRolesExisted,
    userValidate 
} = require('../middlewares');
const { revisarValidaciones } = require('../middlewares/revisarValidaciones');

const router = Router();

router.post('/singup', [
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
signUp);

router.post('/singin', signIn);

module.exports = router;