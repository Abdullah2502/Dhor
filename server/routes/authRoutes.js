import express from 'express';
import { registerController, loginController, getProfileController, updateAddressController, updatePasswordController, getAdminStatsController } from '../controllers/authControllers.js';

// 1. MAKE SURE THIS IS UNCOMMENTED
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js'; 

const router = express.Router();

router.post('/register', registerController);
router.post('/login', loginController);

// 2. MAKE SURE 'requireSignIn' IS HERE
router.get('/profile', requireSignIn, getProfileController); 

router.put('/change-password', requireSignIn, updatePasswordController);

// ADD THIS NEW ROUTE:
router.put('/update-address', requireSignIn, updateAddressController);
router.get('/admin-stats', requireSignIn, isAdmin, getAdminStatsController);

export default router;