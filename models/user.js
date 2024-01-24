const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    userEmail: String,
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
    },
    roles: [String],
    privileges: [String],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
