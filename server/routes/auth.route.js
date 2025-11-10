import express from 'express';
import { login, logout, register } from '../controller/auth/auth.controller.js';
import { isLoggedIn } from '../middleware/auth.middleware.js';
const router = express.Router();


router.post('/register', register);
router.post('/login',login);
router.post('/logout',logout);
router.get('/check-auth', isLoggedIn, (req, res) => {
    res.status(200).json({
        success: true,
        message: "User is authenticated",
        user: req.user
    });
});

export default router;