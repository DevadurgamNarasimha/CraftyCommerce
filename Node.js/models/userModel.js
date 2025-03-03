const mongoose=require('mongoose');
const UserSchema=new mongoose.Schema({
    userId:{type:String, unique:true, required:true},
    username:{type:String, required:true},
    email:{ype:String, unique:true, required:true},
    profileImage:{type:String}
},{timestamps:true});
module.exports=mongoose.model('User',UserSchema);