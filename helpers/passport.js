import passport from 'passport'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import users from '../models/User.js' // Import your User model

/* ===============================
   GOOGLE STRATEGY (OAuth)
================================ */


passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await users.findOne({ googleId: profile.id })

      // if (!user) {
      //   // 2. Create user if they don't exist
      //   // Make sure keys match your Schema (name, email, password)
      //   user = await users.create({
      //     name: profile.displayName || profile.name.givenName, 
      //     email: profile.emails[0].value,
      //     // Provide a random password to satisfy Mongoose 'required' validation
      //     password: Math.random().toString(36).slice(-10) 
      //   });       
      // }

      if (user) {
        return done(null, user)
      }

      user = await users.findOne({ email: profile.emails[0].value });

        if (user) {
          user.googleId = profile.id;
          await user.save();
          return done(null, user);
        }

        user = await users.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id,
        });


      return done(null, user)

    } catch (err) {
      return done(err, null)
    }
  }
))

/* ===============================
   JWT STRATEGY (Protect API)
================================ */
passport.use(new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.secret
  },
  async (payload, done) => {
    try {
      const user = await users.findById(payload.id)
      if (!user) return done(null, false)

      return done(null, user)
    } catch (err) {
      return done(err, false)
    }
  }
))

export default passport