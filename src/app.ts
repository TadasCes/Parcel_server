import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import { usersRouter, reviewRouter } from "./api/routes/users.routes";
import { postsRouter } from "./api/routes/posts.routes";
import { authRouter } from "./api/routes/auth.routes";
import passport from "passport";

import User from "./api/models/user.model";

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
app.use(
  cors({
    origin: "*",
    methods: "GET, POST, PATCH, DELETE, PUT",
    allowedHeaders: "Content-Type, Authorization",
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/", authRouter);
app.use("/users/", usersRouter);
app.use("/review/", reviewRouter);
app.use("/posts/", postsRouter);

app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
  );
  if ("OPTIONS" == req.method) {
    res.send(200);
  } else {
    next();
  }
});

app.listen(5000, () => console.log(`App listening on port ${5000}.`));
