import express from 'express';
import { createAddress, getAddress } from '../../controller/user/user.controller.js';
import { authMiddleware } from '../../middleware/auth.middleware.js';

const router = express.Router();
 
router.route("/address")
.post(authMiddleware,createAddress)
.get(authMiddleware,getAddress)

export default router;