import bcrypt from "bcrypt"
const saltRounds = 10;

export default async (myPlaintextPassword)=>{
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(myPlaintextPassword, salt)
    return hash
}
