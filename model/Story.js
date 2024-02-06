const mongoose=require('mongoose');

const storySchema=mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },
    image:{
        publicId:String,
        url:String
    },
    createdAt: { type: Date, default: Date.now },
},{
    timestamps:true
})
module.exports=mongoose.model('story',storySchema);