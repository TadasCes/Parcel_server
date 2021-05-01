import * as express from "express";
import {
  returnSuccess,
  returnError,
  returnResult,
} from "../middleware/http.messages";
import UserModel from "../models/user.model";
import {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
  addReview,
  getAllUserReviews,
} from "../controllers/users.controller";

export const usersRouter = express.Router();
export const reviewRouter = express.Router();

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
      returnResult(result, res);
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

usersRouter.put("/:id/review", async (req, res, next) => {
  await addReview(req.body.review)
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

reviewRouter.get("/:id", async (req, res, next) => {
  await getAllUserReviews(req.params.id)
    .then((response) => {
      console.log(response)
      returnResult(response, res);
    })
    .catch((error) => {
      returnError(error, res);
    });
});

reviewRouter.post("/add-review", async (req, res, next) => {
  await addReview(req.body)
    .then((response) => {
      returnSuccess(response, res);
    })
    .catch((error) => {
      returnError(error, res);
    });
});
