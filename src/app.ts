import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { usersRouter, reviewRouter } from "./api/routes/users.routes";
import { postsRouter } from "./api/routes/posts.routes";
import { authRouter } from "./api/routes/auth.routes";
import passport from "passport";

import User from "./api/models/user.model";
import { isPropertyAccessChain } from "typescript";

mongoose
  .connect("mongodb://localhost:27017/siunta", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    // tslint:disable-next-line: no-console
    return console.log(`Successfully connected to mongo`);
  });

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/", authRouter);
app.use("/api/users/", usersRouter);
app.use("/api/review/", reviewRouter);
app.use("/api/posts/", postsRouter);

app.all("/*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// handle production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/public/"));
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

app.listen(5000, () => console.log(`App listening on port ${5000}.`));
