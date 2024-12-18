const { default: mongoose } = require('mongoose');

const accessariesSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number },
    description: { type: String, required: true },
    imgUrl: { type: String, required: true },
    category: { type: String, required: true }, 
    available: { type: String, default: 'Stock' } 
});

const Accessaries = mongoose.model('Accessaries', accessariesSchema);

module.exports = Accessaries;
