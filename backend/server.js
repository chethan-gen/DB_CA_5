const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT||3030;
const app = express();
app.use(express.json());
const userRouter = require('./routes/UserRouter');
const contactrouter = require("./routes/ContactRouter");


app.get("/",(req,res)=>{
    res.status(200).json({message:'Welcome to my server'});
});

app.use("/",userRouter);
app.use("/",contactrouter);

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`The server is running on ${PORT}`);
    });
}).catch((err)=>{
    console.log("Something went wrong",err);
})