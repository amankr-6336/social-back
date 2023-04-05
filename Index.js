const express=require("express");
const dotenv=require('dotenv');
const DbConnect=require("./DbConnect");
const authRouter=require('./router/AuthRouter');
const morgan=require('morgan');
const postRouter=require('./router/PostRouter');
const cookieParser=require('cookie-parser');
const cors=require('cors');
const userRouter=require('./router/UserRouter');
const cloudinary=require('cloudinary').v2;



dotenv.config('./env');



cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});  


const app=express();


// middlewares
app.use(morgan('common'));
app.use(express.json({limit:'10mb'}));
app.use(cookieParser());
app.use(cors({
    credentials:true,
    origin:'http://localhost:3000'
}))



app.use('/auth',authRouter);
app.use('/post',postRouter);
app.use('/user', userRouter);
app.get('/' , (req,res) => {
    res.status(200).send("hiiii");
})




const PORT=process.env.PORT || 4001;
DbConnect();

app.listen(PORT ,()=>{
    console.log(`listening to port ${PORT}`);
});





