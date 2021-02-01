import mongoose from "mongoose";
import IRegistration from "../interfaces/IRegistration";
import IUser from "../interfaces/IUser";
import Users from "../models/user.model";
import bcrypt from "bcrypt";
import { postsRouter } from "../routes/posts.routes";

async function getAllUsers() {
  return await Users.find({})
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw new Error(error);
    });
}

async function getOneUser(id: string) {
  return await Users.findById(id)
    .then((user) => {
      return user;
    })
    .catch((error) => {
      throw new Error(error);
    });
}

async function createUser(user: IRegistration) {
  let newUser = {};
  await bcrypt.hash(user.password, 8).then((hashedPassword) => {
    newUser = {
      email: user.email,
      password: hashedPassword,
      firstName: user.firstName,
      lastName: user.lastName,
      registrationTime: Date.now(),
      rating: 0,
      countTrips: 0,
      countDelivered: 0,
      countSent: 0,
      posts: [],
      isAdmin: false
    };
  });

  return await Users.create(newUser)
    .then(() => {
      return "User created successfully!";
    })
    .catch((error) => {
      throw new Error(error);
    });
}

async function updateUser(id: string, user: IUser) {
  return await Users.findOneAndUpdate({ _id: id }, user)
    .then(() => {
      return "User updated successfully!";
    })
    .catch((error) => {
      throw new Error(error);
    });
}

async function assignPostToUser(id: string, postId: string) {
  return await Users.findOneAndUpdate({ _id: id }, { $push: { posts: postId } })
    .then(() => {
      return "Post assigned to the user";
    })
    .catch((error) => {
      throw new Error(error);
    });
}

async function deleteUser(id: string) {
  return await Users.findOneAndRemove({ _id: id })
    .then(() => {
      return "User deleted successfully!";
    })
    .catch((error) => {
      throw new Error(error);
    });
}

export { getAllUsers, getOneUser, createUser, updateUser, assignPostToUser, deleteUser };

// static findUser(name: string): User | undefined {
//   const result = UserList.list.find((u) => u.name === name)
//   if (result === undefined) {
//       return undefined
//   } else {
//       return result
//   }
// }

// static addPassword(user: User, password: string): void {
//   user.password = password
// }

// static addEmail(user: User, email: string): void {
//   user.email = email
// }

// static addFriend(user: User, friend: string): void {
//   user.friendList.push(friend);
// }

// static areFriends(user: User, friend: string): boolean {
//   if (user.friendList.find(fr => fr === friend) === undefined) {
//       return false
//   } else {
//       return true
//   }
// }
