import mongoose from 'mongoose';
import IPost from '../interfaces/IPost';
import Posts from '../models/post.model';

async function getAllPosts() {
  return await Posts.find({})
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw new Error(error);
    });
}

async function getOnePost(id: string) {
  return await Posts.findById(id)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw new Error(error);
    });
}

async function createPost(Post: IPost) {
  return await Posts.create(Post)
    .then(() => {
      return 'Post created successfully!';
    })
    .catch((error) => {
      throw new Error(error);
    });
}

async function updatePost(id: string, Post: IPost) {
  return await Posts.findOneAndUpdate({ _id: id }, Post)
    .then(() => {
      return 'Post updated successfully!';
    })
    .catch((error) => {
      throw new Error(error);
    });
}

async function deletePost(id: string) {
  return await Posts.findOneAndRemove({ _id: id })
    .then(() => {
      return 'Post deleted successfully!';
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
