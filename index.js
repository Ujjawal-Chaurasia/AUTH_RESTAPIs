import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import userRoutes from './routes/users.js';
dotenv.config()
const app= express();
app.use(cors());
app.use(express.json());
app.use('/auth',authRoutes);
app.use('/user',userRoutes);
const CONNECTION_URL= `${process.env.CONNECTION_URL}`
const PORT = process.env.PORT || 5000;
mongoose.connect(CONNECTION_URL,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
   app.listen(PORT,()=>console.log(`server running on port ${PORT}`));
}).catch((error)=>{
   console.log(error.message);
})
// http://localhost:5000/auth/logiin
// [{
//    "name":"Jhon",
//    "email":"babu@gmail.com",
//    "password":"123",
//    "confirmPassword":"123"
// }]