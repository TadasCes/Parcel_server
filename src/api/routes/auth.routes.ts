import * as express from "express";
import passport from "passport";
import { createUser } from "../controllers/users.controller";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import config from "../../config";
import bcrypt from "bcrypt";
var LocalStrategy = require("passport-local").Strategy;

export const authRouter = express.Router();

// Passport local strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    (email, password, done) => {
      User.findOne({ email }, (err, user, info) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          console.log("No such user");
          return done(null, false, { message: "No such user." });
        }
        bcrypt.compare(password, user.password).then((result) => {
          if (!result) {
            console.log("Password incorrect");
            return done(null, false, { message: "Incorrect password." });
          } else {
            console.log("Login successful!");
            return done(null, user);
          }
        });
      });
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

// Auth routes
authRouter.post("/login", (req, res, next) => {
  passport.authenticate("local", { failureFlash: true }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (user) {
      const token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 86400 });
      return res.json({ auth: true, token, user });
    }
    return res.status(401).json(info);
  })(req, res, next);
});

authRouter.post("/register", async (req, res, next) => {
  await createUser(req.body)
    .then(() => {
      res.json({
        status: 200,
        message: "User created successfully!"
      });
    })
    .catch((error) => {
      res.json({
        error
      });
    });
});
