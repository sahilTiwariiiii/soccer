import jwt from 'jsonwebtoken'

const authMiddleware=async(req,res,next)=>{
try {
    const authHeader=req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer ")){
        res.status(401).json({message:"Not Logged In, Please Login"});
    }
    const token=authHeader.split(" ")[1];
    // verfity the token
    const decode=jwt.verify(token,process.env.JWT_SECRET);
    req.user=decode;
    console.log(req.user);
    next();
} catch (error) {
    res.status(401).json({message:"Token expired please try again"});
}
}

export default authMiddleware;