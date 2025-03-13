import { registerUser,loginUser,logoutUser,getUserProfile,updateProfile } from "../services/authService.js";
import { setTokenCookie } from "../utils/generateToken.js";

export const registerUserController = async(req,res) =>{
    try {
       const {name, email, password} = req.body;
       
       const user = await registerUser({name,email,password});

       res.status(201).json({message:'User registered successfully',user});

    } catch (error) {
        console.error('Error at register user:', error);
        
        if(error.message === 'User already exists'){
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const loginUserController = async(req,res) =>{
    try {
      const {email,password} = req.body;
      
      const user = await loginUser({email,password});

      setTokenCookie(res, user.id);

      res.status(200).json({ message: 'User logged in successfully', user });
    } catch (error) {
        console.error('Error login user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const logoutUserController = async(req,res) =>{
    try {
       await logoutUser(req,res);
       res.status(200).json({ message: 'Logged out successfully' });

    } catch (error) {
        console.error('Error logout user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

//Get User Profile
export const getUserProfileController = async(req,res) =>{
    try {
        const {id} = req.user
      const user = await getUserProfile(Number(id));
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

// Update User Profile
export const updateUserProfile = async(req,res) =>{
    try {
        const {id} = req.user;
        const Profile = req.body;
      const updatedUser = await updateProfile(Number(id), Profile);

      if (!updatedUser) {
        return res.status(400).json({ message: 'Failed to update profile' });
      }

      res.status(201).json({message:'User profile updated successfully', updatedUser})
    } catch (error) {
         console.error('Error updating user profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}