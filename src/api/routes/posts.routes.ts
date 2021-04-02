import * as express from "express";
import { returnSuccess, returnError } from "../middleware/http.messages";
import PostModel from "../models/post.model";
import {
  getAllPosts,
  getOnePost,
  createPost,
  updatePost,
  deletePost,
  getFilteredPosts,
} from "../controllers/post.controller";

export const postsRouter = express.Router();

// Get all
postsRouter.get("/", async (req, res, next) => {
  await getAllPosts()
    .then((response) => {
      returnSuccess(response, res);
    })
    .catch((error) => {
      returnError(error, res);
    });
});

// Get one
postsRouter.get("/:id", async (req, res, next) => {
  await getOnePost(req.params.id)
    .then((response) => {
      returnSuccess(response, res);
    })
    .catch((error) => {
      returnError(error, res);
    });
});

// Get filtered
postsRouter.post("/filter", async (req, res, next) => {
  await getFilteredPosts(req.body)
    .then((response) => {
      returnSuccess(response, res);
    })
    .catch((error) => {
      console.log(error.message);
      returnError(error, res);
    });
});

// Create
postsRouter.post("/", async (req, res, next) => {
  await createPost(req.body)
    .then((result) => {
      returnSuccess(result, res);
    })
    .catch((error) => {
      console.log(error);
      returnError(error, res);
    });
});

// Update
postsRouter.put("/:id", async (req, res, next) => {
  await updatePost(req.params.id, req.body)
    .then((result) => {
      returnSuccess(result, res);
    })
    .catch((error) => {
      returnError(error, res);
    });
});

// Delete
postsRouter.delete("/:id", async (req, res, next) => {
  await deletePost(req.params.id)
    .then((result) => {
      returnSuccess(result, res);
    })
    .catch((error) => {
      returnError(error, res);
    });
});
