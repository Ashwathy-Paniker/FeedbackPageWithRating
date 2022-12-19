const mongoose=require('mongoose');
const ReviewSchema=new mongoose.Schema({
    feedback:{
        type:String,
        required:true
    },

    rating:{
        type:Number,
        required:true
    },
   
    date:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model("review",ReviewSchema);