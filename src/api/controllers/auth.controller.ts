import * as express from "express";
import passport from "passport";
import { createUser } from "../controllers/users.controller";
import User from "../models/user.model";
import jwt from "jsonwebtoken";
import config from "../../config";
import bcrypt from "bcrypt";
import { returnError, returnSuccess } from "../middleware/http.messages";
var LocalStrategy = require("passport-local").Strategy;

// Passport local strategy
// login

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    (email, password, done) => {
      console.log("1");
      User.findOne({ email }, (err, user, info) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          console.log("No such user");
          return done(null, false, { message: "No such user." });
        }
        bcrypt.compare(password, user.password, (error, response) => {
          if (!response) {
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
