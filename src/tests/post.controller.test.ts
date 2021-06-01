import { TestScheduler } from "@jest/core";
import { request } from "supertest";
import supertest from "supertest";
import {
  getAllPosts,
  getOnePost,
  createPost,
  updatePost,
  deletePost,
  getFilteredPosts,
} from "../api/controllers/post.controller";
const mongoose = require("mongoose");
const supertest = require("supertest");
import IPost from "../api/interfaces/IPost";

const testPost: any = {
  type: 1,
  canChange: 1,
  cityStart: "Druskininkai",
  cityEnd: "Varėna",
  timeStart: "2021-05-05 20:20",
  timeEnd: "2021-05-05 21:20",
  day: "2021-05-05",
  size: 0,
  authorId: "60a42b8d532d3c315050742f",
  comment: "blabla",
  isActive: true,
};

beforeEach((done) => {
  mongoose.connect(
    "mongodb://localhost:27017/siunta",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => done()
  );
});

test("getAllPosts passed", async () => {
  const post: any = await getAllPosts();
  expect(post[0].id).toBe("60ac14362a528d25acbf66e2");
});

test("getOnePost passed", async () => {
  const post: any = await getOnePost("60ac14362a528d25acbf66e2");

  expect(post.cityStart).toBe("Druskininkai");
  expect(post.cityEnd).toBe("Varėna");
});

test("getOnePost failed", async () => {
  const post: any = await getOnePost("60ac14362a528d25acbf66x2").catch(
    (error) => {
      expect(error.message).toBe("No such post");
    }
  );
});

test("createPost passed", async () =>
  await createPost(testPost)
    .then((response: any) => {
      expect(response).toBe("Post created successfully!");
    })
    .catch((error) => {
      console.log(error);
    }));

test("updatePost passed", async () =>
  await updatePost("60ac14362a528d25acbf66e2", testPost).then(
    (response: any) => {
      expect(response.message).toBe(undefined);
    }
  ));

test("updatePost failed", async () =>
  await updatePost("60ac14362a528dd25acbf66e", testPost).catch(
    (response: any) => {
      expect(response.message).toBe("No such user");
    }
  ));

test("deletePost failed", async () => {
  const post: any = await deletePost("60ac14362a528s25acbf66e").catch(
    (response: any) => {
      expect(response.message).toBe("No such post");
    }
  );
});

test("deletePost failed1", async () => {
  const post: any = await deletePost("60ac143s62a28s25acbf66e").catch(
    (response: any) => {
      expect(response.message).toBe("No such post");
    }
  );
});

test("deletePost passed", async () => {
  const post: any = await deletePost("60ae59c6e1cdad4f001ed754") /// reikia keist id
    .then((response: any) => {
      expect(response.message).toBe(undefined);
    });
});

test("deletePost passed1", async () => {
  await deletePost("60acf28aa3c8c62fe42757ab").then((response: any) => {
    expect(response).toBe("Post deleted successfully!");
  });
});
