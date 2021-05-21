import * as express from "express";
import {
  returnSuccess,
  returnResult,
  returnError,
} from "../middleware/http.messages";
import ParcelModel from "../models/parcel.model";
import {
  getAllParcels,
  getOneParcel,
  createParcel,
  updateParcel,
  deleteParcel,
  getFilteredParcels,
} from "../controllers/parcel.controller";
import {sendContactInfo} from "../controllers/users.controller"
import { mailer } from "../controllers/mailer";

export const parcelsRouter = express.Router();

// Get all
parcelsRouter.get("/", async (req, res, next) => {
  let page = req.query.page;
  let limit = req.query.limit;
  let startIndex = 0;
  let endIndex = 0;
  if (typeof page == "string" && typeof limit == "string") {
    startIndex = (parseInt(page) - 1) * parseInt(limit);
    endIndex = parseInt(page) * parseInt(limit);
  }
  await getAllParcels()
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
parcelsRouter.get("/:id", async (req, res, next) => {
  await getOneParcel(req.params.id)
    .then((response) => {
      returnResult(response, res);
    })
    .catch((error) => {
      returnError(error, res);
    });
});

// Get filtered
parcelsRouter.post("/filter", async (req, res, next) => {
  await getFilteredParcels(req.body)
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
parcelsRouter.post("/", async (req, res, next) => {
  await createParcel(req.body)
    .then((result) => {
      returnSuccess(result, res);
    })
    .catch((error) => {
      console.log(error);
      returnError(error, res);
    });
});

// Update
parcelsRouter.put("/:id", async (req, res, next) => {
  await updateParcel(req.params.id, req.body)
    .then((result) => {
      returnSuccess(result, res);
    })
    .catch((error) => {
      returnError(error, res);
    });
});

// Delete
parcelsRouter.delete("/:id", async (req, res, next) => {
  await deleteParcel(req.params.id)
    .then((result) => {
      returnSuccess(result, res);
    })
    .catch((error) => {
      returnError(error, res);
    });
});

parcelsRouter.post("/send-contact", async (req, res, next) => {
  await sendContactInfo(req.body.Parcel, req.body.email)
    .then(() => {
      returnSuccess("Issiusta", res);
    })
    .catch((error) => {
      returnError(error, res);
    });
});
