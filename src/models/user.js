const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const User = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String
});

module.exports = Mongoose.model('users', User);