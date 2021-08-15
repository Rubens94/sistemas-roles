const { Schema, model } = require('mongoose');

const productSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Nombre obligatorio']
    },
    category: {
        type: String,
        required: [true, 'Categoria obligatoriía']
    },
    price: {
        type: Number,
        required: [true, 'Precio obligatorio']
    },
    imgURL: String
}, {
    timestamps: true,
    versionKey: false
});

module.exports = model( 'Product', productSchema );