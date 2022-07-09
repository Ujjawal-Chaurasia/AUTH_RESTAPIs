import mongoose from "mongoose";
import User from "../models/user.js";
import hashedPassword from '../hash.js';


export const getUser = async (req,res)=>{
    const {id} = req.params;
    try {
      const user = await User.findById(id) 
      res.status(200).json(user); 
    } catch (error) {
      res.status(404).json({"message":"error.message"});
    }
  }

  export const updateUser = async (req, res) => {
    const { id: _id } = req.params;
    const user = req.body;
    const hashPass= await hashedPassword(user.password);
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("No User With That id");
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { name:user.name,email:user.email,password: hashPass},
      { new: true }
    );
    res.json(updatedUser);
  };
  export const deleteUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No User With That id");
    await User.findByIdAndRemove(id);
    res.json({ message: "User deleted successfully" });
  };