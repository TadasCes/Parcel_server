import * as express from "express";
import { returnSuccess, returnError } from "../middleware/http.messages";
import UserModel from "../models/user.model";
import {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/users.controller";

export const usersRouter = express.Router();

usersRouter.get("/", async (req, res, next) => {
  await getAllUsers()
    .then((result) => {
      returnSuccess(result, res);
    })
    .catch((error) => {
      returnError(error, res);
    });
});

usersRouter.get("/:id", async (req, res, next) => {
  await getOneUser(req.params.id)
    .then((result) => {
      returnSuccess(result, res);
    })
    .catch((error) => {
      returnError(error, res);
    });
});

usersRouter.post("/", async (req, res, next) => {
  await createUser(req.body)
    .then((response) => {
      returnSuccess(response, res);
    })
    .catch((error) => {
      returnError(error, res);
    });
});

usersRouter.put("/:id", async (req, res, next) => {
  await updateUser(req.params.id, req.body)
    .then((response) => {
      returnSuccess(response, res);
    })
    .catch((error) => {
      returnError(error, res);
    });
});

usersRouter.delete("/:id", async (req, res, next) => {
  await deleteUser(req.params.id)
    .then((response) => {
      returnSuccess(response, res);
    })
    .catch((error) => {
      returnError(error, res);
    });
});
