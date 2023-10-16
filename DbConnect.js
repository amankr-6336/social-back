const mongoose=require("mongoose");
mongoose.set('strictQuery', true);

module.exports=async () =>{
    const mongoUri="mongodb+srv://amankr11709418:Callofduty@cluster1.ljla0wi.mongodb.net/?retryWrites=true&w=majority";

    // mongodb+srv://amankr6336:NzjePXNWCWROt5DO@cluster1.poin6lr.mongodb.net/?retryWrites=true&w=majority


    // NzjePXNWCWROt5DO

    // NzjePXNWCWROt5DO

    try{
        const connect = await mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

        console.log(`mongodb connected : ${connect.connection.host}`);
    }catch(error){
        console.log(error);
        process.exit(1);
    }
    
}