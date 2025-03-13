import jwt from "jsonwebtoken"
import dotenv from "dotenv"

dotenv.config();

export const protect = (req,res,next) =>{
    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({ message: 'Not authorized, token missing' });  
    }
    
    try {
      //verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;  
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Not authorized, token invalid' }); 
    }
}