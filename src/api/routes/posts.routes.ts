import * as express from 'express';
import HttpException from '../exceptions/exception';
import PostModel from '../models/post.model';
import {
  getAllPosts,
  getOnePost,
  createPost,
  updatePost,
  deletePost,
} from '../controllers/post.controller';

export const postsRouter = express.Router();

postsRouter.get('/', async (req, res, next) => {
  const post = await getAllPosts();
  if (!post || post.length === 0) {
    next(new HttpException(404, 'There are no post'));
  } else {
    res.json({
      status: 200,
      message: 'OK',
      result: post,
    });
  }
});

postsRouter.get('/:id', async (req, res, next) => {
  const Post = await getOnePost(req.params.id);
  if (!Post) {
    next(new HttpException(404, 'Post not found'));
  } else {
    res.json({
      status: 200,
      message: 'OK',
      result: Post,
    });
  }
});

postsRouter.post('/', async (req, res, next) => {
  await createPost(req.body);
  res.json({
    status: 200,
    message: 'Post created successfully!',
  });
});

postsRouter.put('/:id', async (req, res, next) => {
  await updatePost(req.params.id, req.body);
  res.json({
    status: 200,
    message: 'Post created successfully!',
  });
});

postsRouter.delete('/:id', async (req, res, next) => {
  await deletePost(req.params.id);
  res.json({
    status: 200,
    message: 'Post created successfully!',
  });
});
