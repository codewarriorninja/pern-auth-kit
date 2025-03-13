import jwt from "jsonwebtoken"
import dotenv from 'dotenv'

dotenv.config();

export const setTokenCookie = (res,userId) =>{
    //generate the JWT
    const token = jwt.sign({id:userId}, process.env.JWT_SECRET,{
      expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    });

    // Set the token in an HTTP-only cookie

    res.cookie('token', token,{
       httpOnly:true,
       secure:process.env.NODE_ENV === 'production',
       sameSite: 'strict',
       maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
    });
    return token
}