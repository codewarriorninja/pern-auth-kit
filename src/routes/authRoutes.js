import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import { registerUserController,loginUserController,updateUserProfile, logoutUserController, getUserProfileController } from "../controller/authController.js"
import { registerSchema,loginSchema,updateProfileSchema } from "../validation/authValidation.js";
import { validateRequest } from "../middleware/validateMiddleware.js";

const router = express.Router();

// Register User
router.post('/register', validateRequest(registerSchema),registerUserController);

// Login User
router.post('/login', validateRequest(loginSchema), loginUserController);

// Logout User
router.post('/logout', logoutUserController);

// Get User Profile (Protected)
router.get('/profile', protect, getUserProfileController);

// Update User Profile (Protected)
router.put('/profile', protect, validateRequest(updateProfileSchema), updateUserProfile);

export default router;