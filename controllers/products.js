const  Product = require('../models/Product');

const getProducts = async(req, res) => {

    const products = await Product.find();

    res.json(products);
}
const { response } = require('express');

const createProducts = async(req, res = response) => {
    const products = req.body;

    try{

        const productDB = new Product( products );
    
        await productDB.save();
    
        res.status(200).json(productDB);
    } catch (err) {
        res.status(400).json(err);
    }
}

const getProductById = async(req, res = response) => {
    
    const {id} = req.params;

    const product = await Product.findById(id);

    res.json(product);
}

const updateProductsById = async(req, res = response) => {

    const {id} = req.params;
    const body = req.body;

    try{

        const product = await Product.findByIdAndUpdate(id, body, { new: true });
    
        res.json(product);
    } catch (err) {
        res.status(500).json(err);
    }
}

const deleteProductsById = async(req, res = respone) => {

    const {id} = req.params;

    const product = await Product.findByIdAndDelete(id);

    res.json({
        msg: 'Product deleted',
        product
    })
}

module.exports = {
    getProducts,
    createProducts,
    getProductById,
    updateProductsById,
    deleteProductsById
}