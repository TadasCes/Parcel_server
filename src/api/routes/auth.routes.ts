import * as express from "express";
import passport from "passport";
import { createUser } from "../controllers/users.controller";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import config from "../../config";
import bcrypt from "bcrypt";
import { returnError, returnSuccess } from "../middleware/http.messages";
import IRegistration from "../interfaces/IRegistration";

export const authRouter = express.Router();
var LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, done) => {
      User.findOne({ email }, (err, user, info) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { status: 404, message: "No such user." });
        }
        bcrypt.compare(password, user.password, (error, response) => {
          console.log(error)
          console.log(response)
          if (!response) {

            return done(null, false, {
              status: 400,
              message: "Incorrect password.",
            });
          } else {
            return done(null, user);
          }
        });
      });
    }
  )
);

// Auth routes
// Login
authRouter.post("/login", (req, res, next) => {
  passport.authenticate(
    "local",
    { failureFlash: true },
    (error, user, info) => {
      if (error) {
        return returnError(error, res);
      }
      if (user) {
        const token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400,
        });
        return res.json({ auth: true, token, user });
      }
      console.log(error)
      return returnError(info, res);
    }
  )(req, res, next);
});

// Register
authRouter.post("/register", async (req, res, next) => {
  await createUser(req.body)
    .then((response) => {
      returnSuccess(response, res);
    })
    .catch((error) => {
      returnError(error, res);
    });
});

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});

passport.deserializeUser((id, cb) => {
  User.findById(id, (err, user) => {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});
