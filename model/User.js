const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true

    },
    password:{
        type : String,
        required: true,
        select:false
    },
    name:{
        type:String,
        required: true,
    },
    bio:{
      type:String
    },
    avatar:{
        publicId:String,
        url: String
    },
    followers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
    ],
    followings:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }
    ],
    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'post'
        }
    ],
    story:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'story'  
        }
    ]

},{
    timestamps:true
});

module.exports=mongoose.model('user',userSchema);