import mongoose from "mongoose";
import IRegistration from "../interfaces/IRegistration";
import HttpException from "../middleware/http.exception";
import IUser from "../interfaces/IUser";
import Users from "../models/user.model";
import bcrypt from "bcrypt";
import { hashPassword } from "../middleware/utils";
import { postsRouter } from "../routes/posts.routes";

async function getAllUsers() {
  return await Users.find({})
    .then((result) => {
      if (!result) {
        throw new HttpException(404, "No result");
      }
      return result;
    })
    .catch(() => {
      throw new HttpException(404, "No results");
    });
}

async function getOneUser(id: string) {
  return await Users.findById(id)
    .then((result) => {
      if (!result) {
        throw new HttpException(404, "No result");
      }
      return result;
    })
    .catch(() => {
      throw new HttpException(404, "No such user");
    });
}

async function createUser(user: IRegistration) {
  return await checkIfEmailTaken(user.email)
    .then(async (response) => {
      if (!response) {
        const password = await hashPassword(user.password);
        const newUser = {
          email: user.email,
          password: password,
          firstName: user.firstName,
          lastName: user.lastName,
          registrationTime: Date.now(),
          phone: "",
          rating: 0,
          countTrips: 0,
          countDelivered: 0,
          countSent: 0,
          posts: [],
          isAdmin: false,
        };
        return await Users.create(newUser)
          .then(() => {
            return "User created successfully!";
          })
          .catch((error) => {
            throw new Error(error);
          });
      } else {
        throw new HttpException(400, "Email is already taken");
      }
    })
    .catch((error) => {
      throw new HttpException(error.status, error.message);
    });
}

async function checkIfEmailTaken(email: string) {
  return await Users.findOne({ email: email }).then((user) => {
    return user != null ? true : false;
  });
}

async function updateUser(id: string, user: IUser) {
  return await Users.findOneAndUpdate({ _id: id }, user)
    .then(() => {
      return "User updated successfully!";
    })
    .catch(() => {
      throw new HttpException(404, "No such user");
    });
}

async function assignPostToUser(authorId: string, postId: string) {
  await Users.findOneAndUpdate({ _id: authorId }, { $push: { posts: postId } })
    .then(() => {
      return "Post assigned to the user";
    })
    .catch(() => {
      throw new HttpException(404, "No such user");
    });
}

async function deleteUser(id: string) {
  return await Users.findOneAndRemove({ _id: id })
    .then(() => {
      return "User deleted successfully!";
    })
    .catch(() => {
      throw new HttpException(404, "No such user");
    });
}

export {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  assignPostToUser,
  deleteUser,
};
