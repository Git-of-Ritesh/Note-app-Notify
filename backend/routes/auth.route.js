import express from 'express';
import { signup, signin, signout } from '../Controller/auth.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

// Auth routes
router.post('/signup', signup);  // User registration
router.post('/signin', signin);   // User login
router.post('/signout', verifyToken, signout); // Secure signout

// Handle unsupported routes
router.all('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Invalid route' });
});

export default router;
