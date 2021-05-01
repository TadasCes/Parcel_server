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
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

passport.use(
  new GoogleStrategy(
    {
      clientID:
        "178775464945-f6ok0o75ku4estdbkassoubgk8jpc01p.apps.googleusercontent.com",
      clientSecret: "a87vF1aI3chAqVzc63mfzkds",
      callbackURL: "http://127.0.0.1:5000/auth/google/callback",
    },
    async function (token, tokenSecret, profile, done) {
      await User.findOne({ googleId: profile.id }, async function (err, user) {
        if (user == null) {
          const newUser = {
            email: profile.emails[0].value,
            password: "",
            firstName: profile.name.familyName,
            lastName: profile.name.givenName,
            phone: "",
            googleId: profile.id
          } 
          await createUser(newUser).then((user) => {
            console.log("sukurtas")
            return done(null, user);
          });
        } else {
          console.log(user)
          return done(null, user);
        }
      });
    }
  )
);

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

authRouter.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
    // scope: ["https://www.googleapis.com/auth/plus.login"],
  }),
  function (req, res) {
    console.log("ja");
  }
);

authRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res: any) {
    res.redirect("/");
  }
);

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
