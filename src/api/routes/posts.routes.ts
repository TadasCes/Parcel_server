import * as express from "express";
import {
  returnSuccess,
  returnResult,
  returnError,
} from "../middleware/http.messages";
import PostModel from "../models/post.model";
import {
  getAllPosts,
  getOnePost,
  createPost,
  updatePost,
  deletePost,
  getFilteredPosts,
} from "../controllers/post.controller";
import {sendContactInfo} from "../controllers/users.controller"
import { mailer } from "../controllers/mailer";

export const postsRouter = express.Router();

// Get all
postsRouter.get("/", async (req, res, next) => {
  let page = req.query.page;
  let limit = req.query.limit;
  let startIndex = 0;
  let endIndex = 0;
  if (typeof page == "string" && typeof limit == "string") {
    startIndex = (parseInt(page) - 1) * parseInt(limit);
    endIndex = parseInt(page) * parseInt(limit);
  }
  await getAllPosts()
    .then((response) => {
      if (startIndex > 0) {
        const limitedResult = response.slice(startIndex, endIndex);
        returnResult(limitedResult, res);
      } else {
        returnResult(response, res);
      }
    })
    .catch((error) => {
      returnError(error, res);
    });
});

// Get one
postsRouter.get("/:id", async (req, res, next) => {
  await getOnePost(req.params.id)
    .then((response) => {
      returnResult(response, res);
    })
    .catch((error) => {
      returnError(error, res);
    });
});

// Get filtered
postsRouter.post("/filter", async (req, res, next) => {
  await getFilteredPosts(req.body)
    .then((response) => {
      console.log(response);
      returnResult(response, res);
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

postsRouter.post("/send-contact", async (req, res, next) => {
  await sendContactInfo(req.body.post, req.body.email)
    .then(() => {
      returnSuccess("Issiusta", res);
    })
    .catch((error) => {
      returnError(error, res);
    });
});
