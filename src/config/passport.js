import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          return done(null, false, { message: 'Usuario no encontrado' });
        }
        
        const isValid = user.comparePassword(password);
        if (!isValid) {
          return done(null, false, { message: 'Contraseña incorrecta' });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.use('jwt', new passport.Strategy({
  jwtFromRequest: req => req.cookies.token, 
  secretOrKey: process.env.JWT_SECRET
}, async (token, done) => {
  try {
    const user = await User.findById(token.id);
    if (!user) {
      return done(null, false, { message: 'Usuario no encontrado' });
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));

export default passport;
