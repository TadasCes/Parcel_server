import { Request, Response } from "express";
import { NextFunction } from "express";

function returnSuccess(result, res) {
  return res.json({
    status: 200,
    message: result,
  });
}

function returnResult(result, res) {
  return res.json({
    result
  });
}

function returnError(error, res) {
  const status = error.status || 500;
  const message = error.message || "Something went wrong";

  res.status(status).json({
    status,
    message,
  });
}

export { returnSuccess, returnResult, returnError };

// userRouter.post(
//   '/',
//   (req: Request, res: express.Response, next: express.NextFunction) => {
//     if (req.body.email) {
//       if (req.body.name.length < 3) {
//         next(new HttpException(400, "User's name must have at least 3 characters"));
//         return;
//       } else if (req.body.name.length > 30) {
//         next(new HttpException(400, "User's name is too long (max - 30 characters)"));
//         return;
//       } else if (typeof req.body.name !== 'string') {
//         next(new HttpException(400, 'Invalid name'));
//         return;
//       } else if (UserUtil.findUser(req.body.name)) {
//         next(new HttpException(400, 'User already exists'));
//         return;
//       } else {
//         UserModel.create({ email: req.body.email });
//         UserList.addUser(req.body.name);
//         res.status(200).json({
//           status: 200,
//           message: "User '" + req.body.name + "' created successfully",
//         });
//       }
//     } else {
//       next(new HttpException(400, "User's name not provided"));
//       return;
//     }
//   },
// );
// userRouter.delete(
//   '/:name',
//   (req: express.Request, res: express.Response, next: express.NextFunction) => {
//     if (req.params.name) {
//       const user = UserUtil.findUser(req.params.name);
//       if (user === undefined) {
//         next(new HttpException(404, 'User not found'));
//         return;
//       } else {
//         UserList.deleteUser(user);
//         res.status(200).json({
//           status: 200,
//           message: 'User deleted',
//         });
//       }
//     } else {
//       next(new HttpException(400, 'Please provide user name'));
//       return;
//     }
//   },
// );
