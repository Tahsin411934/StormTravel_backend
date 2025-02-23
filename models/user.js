const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    mobileNumber: { type: String, },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, default:'12345Aa' },
    role: { type: String, default: 'user' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
