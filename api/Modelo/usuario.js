const mongoose = require('mongoose');
const {Schema} = mongoose;

/*Se construye formato de objeto json para usuarios*/
const UserSchema = new Schema({
    name: String,
    document:String,
    email:{type:String, unique:true},
    password:String,
});

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;

