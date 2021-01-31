import * as express from 'express';
import HttpException from '../exceptions/exception';
import UserModel from '../models/user.model';
import {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/users.controller';

export const usersRouter = express.Router();

usersRouter.get('/', async (req, res, next) => {
  const users = await getAllUsers();
  if (!users || users.length === 0) {
    next(new HttpException(404, 'There are no users'));
  } else {
    res.json({
      status: 200,
      message: 'OK',
      result: users,
    });
  }
});

usersRouter.get('/:id', async (req, res, next) => {
  const user = await getOneUser(req.params.id);
  if (!user) {
    next(new HttpException(404, 'User not found'));
  } else {
    res.json({
      status: 200,
      message: 'OK',
      result: user,
    });
  }
});

usersRouter.post('/', async (req, res, next) => {
  await createUser(req.body);
  res.json({
    status: 200,
    message: 'User created successfully!',
  });
});

usersRouter.put('/:id', async (req, res, next) => {
  await updateUser(req.params.id, req.body);
  res.json({
    status: 200,
    message: 'User created successfully!',
  });
});

usersRouter.delete('/:id', async (req, res, next) => {
  await deleteUser(req.params.id);
  res.json({
    status: 200,
    message: 'User created successfully!',
  });
});

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
