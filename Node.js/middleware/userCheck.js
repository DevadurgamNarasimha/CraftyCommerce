const User=require('../models/userModel');
const userCheck=async(req,resizeBy,next)=>{
    const userId=req.headers.userid||req.body.userId||req.query.userId;
    if(!userId)return resizeBy.status(400).json({erro:'UserId is required'});
    try{
        const user=await User.findOne({userId});
        if(!user)return resizeBy.status(404).json({error:'User not found'});
        req.user=user;
        next();
    }catch(error){
        resizeBy.status(500).json({error:'Server error'});
    }
};
module.exports=userCheck;