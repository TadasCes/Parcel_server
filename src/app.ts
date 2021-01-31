import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import errorMiddleWare from "./api/middleware/http.messages";
import { usersRouter } from "./api/routes/users.routes";
import { postsRouter } from "./api/routes/posts.routes";
import { authRouter } from "./api/routes/auth.routes";
import passport from "passport";

import User from "./api/models/user.model";

mongoose
  .connect("mongodb://localhost:27017/siunta", { useNewUrlParser: true, useUnifiedTopology: true })
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

app.use("/", authRouter);
app.use("/users/", usersRouter);
app.use("/posts/", postsRouter);

app.listen(5000, () => console.log(`App listening on port ${5000}.`));
