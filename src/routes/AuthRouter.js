import express from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();

router.post('/login', passport.authenticate('login', { session: false }), (req, res) => {
  const user = req.user;
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.cookie('token', token, { httpOnly: true }); 
  res.status(200).json({ message: 'Login exitoso', token });
});

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.status(200).json(req.user); 
});

export default router;
