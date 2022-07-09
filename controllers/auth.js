import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import hashedPassword from '../hash.js';
import bcrypt from 'bcrypt'

export const login=async(req,res)=>{
    const {email,password}=req.body;
    try {
        const existingUser=await User.findOne({email})
        if(!existingUser) return res.status(404).json({message:"user doesnt exist"})
        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password)
        if(!isPasswordCorrect)return res.status(400).json({message:"Invalid Password"})
        const token = jwt.sign({email:existingUser.email,id:existingUser._id},'test')
        res.status(200).json({token})
    } catch (error) {
        res.status(500).json({error, message:"Something went wrong"})
    }
}
export const register=async(req,res)=>{
    const {name,email,password,confirmPassword} =req.body;
    try {
        const existingUser=await User.findOne({email})
        if(existingUser) return res.status(400).json({message:"user already exist"})
        if(password!=confirmPassword)  return res.status(400).json({message:"password did not matched with confirm password"})
      
        const hashPass= await hashedPassword(password);
        const result = await new User({email,password: hashPass,name})
        result.save()
        const token = jwt.sign({email:result.email,id:result._id},'test')
        res.status(200).json({token})
    } catch (error) {
        res.status(500).json({error, message:"Something went wrong"});
    }
}