import User from "../models/User.js";
import Role from "../models/Role.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import generateUniqueEmployeeId from '../services/generateemployeeid.service.js'

export const registerUser = async (req, res) => {
  const { hospitalId, branchId } = req.user;
  const { name, email, password, phone, role, department_id, qualification, dateOfBirth, gender, address, joiningDate, salary } = req.body;

  try {
    const { hospitalId, branchId } = req.user;

    if (!name || !email || !password || !role || !department_id || !phone || !qualification) {
      return res.status(400).json({ message: "Please fill all the required fields" });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "User already exists, Please Login" });
    }

    const roleExists = await Role.findById(role);
    if (!roleExists) {
      return res.status(404).json({ message: "Role not found" });
    }

    const unique_employee_id = await generateUniqueEmployeeId();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await User.create({
      ...req.body,
      password: hashedPassword,
      employee_id: unique_employee_id,
      hospitalId,
      branchId,
      permissions: roleExists.permissions,
    });

    return res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// // Example without return:
// if(!name){
//     res.status(400).json({message:"Name is required"})
// }
// // code continues here


// Agar return nahi hoga, function yahin se nahi rukega

// Baaki code bhi execute ho jayega

// Matlab agar name missing hai, fir bhi DB me jaake User.create() ho sakta hai → unwanted behavior

// Example with return:
// if(!name){
//     return res.status(400).json({message:"Name is required"})
// }
// // code **yahin stop** ho gaya, aage ka execute nahi hoga


// Function turant return kar deta hai

// Safety ✅, no accidental DB insert

// Response client ko bhi milta hai

// ✅ Short answer:

// res.status(...).json(...) bhejta hi hai response

// return lagane ka reason → function ko wahan stop karna, taaki aur code execute na ho jaye

// Agar return nahi hai → code aage bhi run karega, jo galat data create kar sakta hai

// Agar chaho, mai aapka final safe registerUser controller bana ke dikhadu, jisme:

// Minimum fields check

// Extra fields auto-save

// Return ka proper use

// Hash password

// Chahiye mai wo bana du?

// kuch bhi lekin mene test kiya aisa kuch nahi hua response aya  tum jhut bol rahe ho ]

// Ah, ab samajh gaya 😄 — technically response toh mil hi jata hai chahe return ho ya na ho, isme aap sahi ho.

// Par point ye hai:

// res.status(...).json(...) sirf client ko bhejta hai response.

// Function execution continue hota hai agar aap return nahi lagate.

// Agar try/catch me aage ka code me database insert ya extra logic hai, toh wo galti se execute ho sakta hai, chahe client ko response mil gaya ho.

// Example:

// if (!name) res.status(400).json({ message: "Name required" });
// // code continues here
// await User.create({ ...req.body }); // ye bhi execute ho sakta hai


// Client ko response mil gaya → test me aapko lagta hai sab sahi hai.

// Lekin server side me unwanted DB insert ho gaya → kabhi bug ban sakta hai.

// TL;DR:

// Response milta hi hai — isliye aapko lagta hai “kuch nahi hua”

// return sirf function execution rokta hai → safe programming

// Agar chaho, mai aapke current controller ko fully safe aur future-proof bana ke dikhadu jisme:

// Required fields check ✅

// Extra fields save ✅

// Hash password ✅

// Return ka proper use ✅

// Chahiye mai wo bana du?

// o galti se execute ho sakta hai, chahe client ko response mil gaya ho. ye batao ho sakta hai ya hota hai hsoert me

// Short me:

// Hota tab hai jab aap return na lagaye aur aage ka code execute hone layak ho.

// Agar sirf res.status(...).json(...) ke baad koi DB insert ya aur logic na ho, toh galti se execute hone ka case nahi aata.

// Lekin jaise hi await User.create(...) ya aur code likha ho, wo execute ho sakta hai → bug ban sakta hai.

// ✅ Rule: Response bhejne ke baad hamesha return lagao, taaki function turant stop ho jaye.


// Login Flow

export const loginController=async(req,res)=>{
// first check that email was present or not 
const {email,password}=req.body;
if(!email){
    return res.status(404).json({message:"Please Enter the Email"})
}
if(!password){
    return res.status(404).json({message:"Please Enter the Password"})
}
const user=await User.findOne({email});
if(!user){
    return res.status(401).json({message:"Invalid Credentials"})
}
// check the real password with its hashed store in the database
const isMatch= await bcrypt.compare(password,user.password);
if(!isMatch){
    return res.status(401).json({message:"Invalid Credentials"})
}
// now sign the token 
const token=jwt.sign({
  id:user._id,
  email:user.email, 
  role: user.role,
  hospitalId: user.hospitalId,
  branchId: user.branchId
},process.env.JWT_SECRET,{expiresIn:process.env.Jwt_EXPIRES_IN})
return res.status(200).json({message:"Login Sucessfully",token,user: {
  _id: user._id,
  email: user.email,
  role: user.role,
  name: user.name,
  employee_id: user.employee_id,
  hospitalId: user.hospitalId,
  branchId: user.branchId
}})
} 