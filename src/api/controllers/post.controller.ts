import moment from "moment";
import mongoose from "mongoose";
import IPost from "../interfaces/IPost";
import Post from "../models/post.model";
import { usersRouter } from "../routes/users.routes";
import { getOneUser, assignPostToUser } from "../controllers/users.controller";

async function getAllPosts() {
  return await Post.find({})
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw new Error(error);
    });
}

async function getOnePost(id: string) {
  return await Post.findById(id)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw new Error(error);
    });
}

async function createPost(newPost: IPost) {
  console.log(newPost.author.id);
  return await Post.create(newPost)
    .then((post) => {
      assignPostToUser(newPost.author.id, post.id).then(() => {
        console.log("Post created successfully!");
        return "Post created successfully!";
      });
    })
    .catch((error) => {
      throw new Error(error);
    });
}

async function updatePost(id: string, post: IPost) {
  return await Post.findOneAndUpdate({ _id: id }, Post)
    .then(() => {
      return "Post updated successfully!";
    })
    .catch((error) => {
      throw new Error(error);
    });
}

async function deletePost(id: string) {
  return await Post.findOneAndRemove({ _id: id })
    .then(() => {
      return "Post deleted successfully!";
    })
    .catch((error) => {
      throw new Error(error);
    });
}

export { getAllPosts, getOnePost, createPost, updatePost, deletePost };

// static findPost(name: string): Post | undefined {
//   const result = PostList.list.find((u) => u.name === name)
//   if (result === undefined) {
//       return undefined
//   } else {
//       return result
//   }
// }

// static addPassword(Post: Post, password: string): void {
//   Post.password = password
// }

// static addEmail(Post: Post, email: string): void {
//   Post.email = email
// }

// static addFriend(Post: Post, friend: string): void {
//   Post.friendList.push(friend);
// }

// static areFriends(Post: Post, friend: string): boolean {
//   if (Post.friendList.find(fr => fr === friend) === undefined) {
//       return false
//   } else {
//       return true
//   }
// }
