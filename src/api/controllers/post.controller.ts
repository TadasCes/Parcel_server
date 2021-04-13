import moment from "moment";
import mongoose from "mongoose";
import IPost from "../interfaces/IPost";
import Post from "../models/post.model";
import { usersRouter } from "../routes/users.routes";
import { getOneUser, assignPostToUser } from "../controllers/users.controller";
import HttpException from "../middleware/http.exception";

async function getAllPosts() {
  return await Post.find({})
    .then((result) => {
      return result;
    })
    .catch(() => {
      throw new HttpException(404, "No results");
    });
}

async function getFilteredPosts(query: any) {
  return await Post.aggregate([
    {
      $match: { cityStart: query.cityStart },
    },
  ])
    .then((result) => {
      return result;
    })
    .catch(() => {
      throw new HttpException(404, "No results");
    });
}

async function getAllUserPosts(query: any) {
  return await Post.aggregate([
    {
      $match: { author: query.cityStart },
    },
  ])
    .then((result) => {
      return result;
    })
    .catch(() => {
      throw new HttpException(404, "No results");
    });
}

async function getOnePost(id: string) {
  return await Post.findById(id)
    .then((result) => {
      return result;
    })
    .catch(() => {
      throw new HttpException(404, "No such post");
    });
}

async function createPost(newPost: IPost) {
  console.log(newPost.author.id);
  await Post.create(newPost)
    .then(async (post) => {
      await assignPostToUser(newPost.author.id, post.id)
        .then((response) => {
          console.log(response);
          return "Post created successfully!";
        })
        .catch((error) => {
          throw error;
        });
    })
    .catch((error) => {
      throw error;
    });
}

async function updatePost(id: string, post: IPost) {
  return await Post.findOneAndUpdate({ _id: id }, post)
    .then(() => {
      return "Post updated successfully!";
    })
    .catch(() => {
      throw new HttpException(404, "No such user");
    });
}

async function deletePost(id: string) {
  return await Post.findOneAndRemove({ _id: id })
    .then(() => {
      return "Post deleted successfully!";
    })
    .catch(() => {
      throw new HttpException(404, "No such user");
    });
}

export {
  getAllPosts,
  getOnePost,
  createPost,
  updatePost,
  deletePost,
  getFilteredPosts,
};
