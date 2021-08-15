const { Router } = require('express');
const { check } = require('express-validator');
const { revisarValidaciones } = require('../middlewares/revisarValidaciones');

const {
    verifyToken,
    isModerator,
    isAdmin
} = require('../middlewares');

const {
    getProducts, 
    createProducts,
    getProductById,
    updateProductsById,
    deleteProductsById,
} = require('../controllers/products');

const router = Router();

router.get('/', getProducts);

router.post('/', [
    check('name', 'El nombre es obligatorio').not().isEmpty().escape().trim(),
    check('category','La categoría es obligatorio').not().isEmpty().trim().escape(),
    check('price','El precio es obligatorio').not().isEmpty().trim().escape(),
    check('imgURL').trim().escape(),
    verifyToken,
    isAdmin
], 
revisarValidaciones, 
createProducts);

router.get('/:id', getProductById);

router.put('/:id', [
    check('name', 'El nombre es obligatorio').not().isEmpty().escape().trim(),
    check('category','La categoría es obligatorio').not().isEmpty().trim().escape(),
    check('price','El precio es obligatorio').not().isEmpty().trim().escape(),
    check('imgURL').trim().escape(),
    verifyToken,
    isModerator,
    isAdmin
], 
revisarValidaciones, 
updateProductsById);

router.delete('/:id', [
    verifyToken,
    isAdmin
], deleteProductsById);

module.exports = router;