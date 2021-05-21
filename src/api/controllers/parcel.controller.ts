import moment from "moment";
import mongoose from "mongoose";
import IParcel from "../interfaces/IParcel";
import Parcel from "../models/parcel.model";
import { usersRouter } from "../routes/users.routes";
import { getOneUser, assignParcelToUser } from "./users.controller";
import HttpException from "../middleware/http.exception";

async function getAllParcels() {
  return await Parcel.find({})
    .sort({ timeStart: "asc" })
    .then((result) => {
      return result;
    })
    .catch(() => {
      throw new HttpException(404, "No results");
    });
}

async function getFilteredParcels(query: any) {
  return await Parcel.aggregate([
    {
      $match: {
        $and: [
          { cityStart: query.cityStart },
          { cityEnd: query.cityEnd },
          { type: query.type },
        ],
      },
      // { $match: { date: query.date } },
      // { $match: { type: query.type } },
      // {
      //   $cond: {
      //     if: { $gte: [query.size, "$size"] },
      //     then: { $match: { size: query.size } },
      //   },
      // },
    },
  ])
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch(() => {
      throw new HttpException(404, "No results");
    });
}

async function getOneParcel(id: string) {
  return await Parcel.findById(id)
    .then((result) => {
      return result;
    })
    .catch(() => {
      throw new HttpException(404, "No such Parcel");
    });
}

async function createParcel(newParcel: IParcel) {
  console.log(newParcel);
  await Parcel.create(newParcel)
    .then(async (Parcel) => {
      await assignParcelToUser(newParcel.authorId, Parcel.id)
        .then((response) => {
          console.log(response);
          return "Parcel created successfully!";
        })
        .catch((error) => {
          throw error;
        });
    })
    .catch((error) => {
      throw error;
    });
}

async function updateParcel(id: string, parcel: IParcel) {
  return await Parcel.findOneAndUpdate({ _id: id }, parcel)
    .then(() => {
      return "Parcel updated successfully!";
    })
    .catch(() => {
      throw new HttpException(404, "No such user");
    });
}

async function deleteParcel(id: string) {
  return await Parcel.findOneAndRemove({ _id: id })
    .then(() => {
      return "Parcel deleted successfully!";
    })
    .catch(() => {
      throw new HttpException(404, "No such user");
    });
}

export {
  getAllParcels,
  getOneParcel,
  createParcel,
  updateParcel,
  deleteParcel,
  getFilteredParcels,
};
