//Connect mongoose
const mongoose = require('mongoose');

//make a new UserSchema
const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    userOrientation: {
        type: String,
        required: true
    }
})

//export
const User = mongoose.model("User", UserSchema);
module.exports = User;