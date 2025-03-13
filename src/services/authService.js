import bcrypt from "bcrypt"
import prisma from "../config/prismaClient.js"


export const registerUser = async({name,email,password}) =>{
    try {
        const existingUser = await prisma.user.findUnique({where:{email}});

        if(existingUser) throw new Error ('User already exists');
    
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        const user = await prisma.user.create({
            data:{name,email,password:hashedPassword},
            select:{id:true,name:true,email:true,createdAt:true}
        })
        return user;  
    } catch (error) {
       console.error(error); 
       throw error
    }
}

export const loginUser = async({email,password}) =>{
    try {
      const user = await prisma.user.findUnique({where:{email}});
      
      if(!user || !(await bcrypt.compare(password, user.password))){
        throw new Error('Invalid email or password');
      }

      return { id: user.id, name: user.name, email: user.email, createdAt: user.createdAt };

    } catch (error) {
        console.error(error)
        throw error
    }
}

//logout user
export const logoutUser = async(req,res) =>{
    res.clearCookie('token');
}

//get User Profile
export const getUserProfile = async(userId) =>{
    try {
        const user = await prisma.user.findUnique({
            where:{id:userId},
            select:{id:true, name:true, email:true, createdAt:true},
        });
        if(!user) throw new Error('User not found');
    
        return user;  
    } catch (error) {
        console.error(error)
        throw error 
    }
}

//update User Profile
export const updateProfile = async(userId,updatedData) =>{
    try {
        const {name,email,password} = updatedData;

        const user = await prisma.user.findUnique({where:{id:userId}});
        if(!user) throw new Error('User not found');
    
        const updateFileds = {};
        if(name) updateFileds.name = name;
        if(email) updateFileds.email = email;
        if(password) {
            const salt = await bcrypt.genSalt(10);
            updateFileds.password = await bcrypt.hash(password, salt);
        }
        const updatedUser = await prisma.user.update({
            where:{id:userId},
            data:updateFileds,
            select:{id:true, name:true, email:true, createdAt:true},
        });
        return updatedUser;  
    } catch (error) {
        console.error(error)
        throw error  
    }
}