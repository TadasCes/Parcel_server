import moment from "moment";
import mongoose from "mongoose";
import IPost from "../interfaces/IPost";
import Post from "../models/post.model";
import { usersRouter } from "../routes/users.routes";
import { getOneUser, assignPostToUser } from "./users.controller";
import HttpException from "../middleware/http.exception";

async function getAllPosts() {
  return await Post.find({})
    .sort({ timeStart: "asc" })
    .then((result) => {
      return result;
    })
    .catch(() => {
      throw new HttpException(404, "No results");
    });
}

async function getAllUserPosts(id) {
  return await Post.find({ authorId: id })
    .sort({ timeStart: "asc" })
    .then((result) => {
      return result;
    })
    .catch(() => {
      throw new HttpException(404, "No results");
    });
}

async function getFilteredPosts(query: any) {
  console.log(query);
  return await Post.aggregate([
    {
      // $project: {
      //   post: {
      //     $filter: {
      //       input: "$post",
      //       as: "post",
      //       cond: {
      //         $eq: [
      //           "$cityStart", "Kaunas" ,
      //           { cityEnd: query.cityEnd },
      //           { day: query.date },
      //           { type: query.type },
      //         ],
      //       },
      //     },
      //   },
      // },
      $match: {
        $and: [
          { cityStart: query.cityStart },
          { cityEnd: query.cityEnd },
          { day: query.date },
          { type: query.type },
        ],
      },
    },
  ])
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch((error) => {
      console.log(error);
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
  console.log(newPost);
  if (newPost.type >= 1 || newPost.type <= 2) {
    await Post.create(newPost)
      .then(async (post) => {
        await assignPostToUser(newPost.authorId, post.id)
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
  } else {
    throw new HttpException(401, "Wrong type");
  }
}

async function updatePost(id: string, post: IPost) {
  console.log(post);
  return await Post.findOneAndUpdate({ _id: id }, post)
    .then((result) => {
      console.log(result);
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
      throw new HttpException(404, "No such post");
    });
}

async function seenCount(id: string) {
  return await Post.findOneAndUpdate(
    { _id: id },
    { $inc: { seenCount: 1 } },
    { new: true }
  ).then(() => {
    return "Seen added";
  });
}

async function deactivatePost(id: string) {
  return await Post.findOneAndUpdate(
    { _id: id },
    { isActive: false },
    { new: true }
  ).then(() => {
    return "Deactivated";
  });
}

async function activatePost(id: string) {
  return await Post.findOneAndUpdate(
    { _id: id },
    { isActive: true },
    { new: true }
  ).then(() => {
    return "Activated";
  });
}

export {
  getAllPosts,
  getOnePost,
  createPost,
  updatePost,
  deletePost,
  getFilteredPosts,
  seenCount,
  getAllUserPosts,
  activatePost,
  deactivatePost,
};
