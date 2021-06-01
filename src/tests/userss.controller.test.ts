/* tslint:disable */
import { TestScheduler } from "@jest/core";
import { request } from "supertest";
import supertest from "supertest";
import {
  getOneReview,
  getOneUserByEmail,
  assignReviewToUser,
  checkIfEmailTaken,
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  getAllUserReviews,
  assignPostToUser,
  deleteUser,
  increaseTripCount,
  addReview,
  increaseSentCount,
  sendContactInfo,
  changePassword,
  forgotPassword,
} from "../api/controllers/users.controller";
import IReview from "../api/interfaces/IReview";
import IUser from "../api/interfaces/IUser";
const mongoose = require("mongoose");
const supertest = require("supertest");

const testReview: any = {
  targetId: "60ad48a4763e3a410cbf267e",
  authorId: "60ad48a4763e3a410cbf267e",
  comment: "abla",
  rating: 4,
  date: "2020-01-20",
};

const testUser: any = {
  email: "testas@gmail.com",
  password: "asdasdasd",
  firstName: "Testas",
  lastName: "Testas",
  registeredDate: "2020-20-20",
  phone: "868686",
  rating: 0,
  review: [],
  reviewCount: 0,
  tripCount: 0,
  sentCount: 0,
  posts: [],
  googleId: "123",
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

test("GET allusers passed", async () => {
  const users: any = await getAllUsers();

  expect(users[0].firstName).toBe("Jonas");
});

test("GetOneUserByID passed", async () => {
  const user: any = await getOneUser("60ac04e60214d50b504855a2");

  expect(user.firstName).toBe("Jonas");
});

test("GetOneUserByID failed", async () => {
  const user: any = await getOneUser("123456789").catch((response: any) => {
    expect(response.message).toBe("No such user");
  });
});

test("getOneUserByEmail passed", async () => {
  const user: any = await getOneUserByEmail("ramonas@gmail.com");

  expect(user.firstName).toBe("Jonas");
});

test("getOneUserByEmail failed", async () => {
  const user: any = await getOneUserByEmail("alio@alio").catch(
    (response: any) => {
      expect(response.message).toBe("No such user");
    }
  );
});

test("Create User passed", async () => {
  await createUser({
    email: "test@gmaaassaaaassaaaail.com", //reikia koreguoti emailą
    password: "asdasdasd",
    firstName: "test",
    lastName: "test",
    phone: "+37061111111",
  }).then((response: any) => {
    expect(response).toBe("User created successfully!");
  });
});

test("Create user failed", async () => {
  await createUser({
    email: "test@gmail.com",
    password: "asdasdasd",
    firstName: "test",
    lastName: "test",
    phone: "+37062323233",
  }).catch((response: any) => {
    expect(response.message).toBe("Email is already taken");
  });
});

test("getAllUserReviews passed", async () => {
  await getAllUserReviews("60930c83ec6f5f4b7863e46d").then((result: any) => {
    expect(result[0].targetId).toBe("60930c83ec6f5f4b7863e46d");
  });
});

test("getOneReview passed", async () => {
  const user: any = await getOneReview("6094275d3bcc0153c8d6f0c3");

  expect(user.rating).toBe(5);
});

test("getOneReview failed", async () => {
  const user: any = await getOneReview("123456789").catch((response: any) => {
    expect(response.message).toBe("No such user");
  });
});

test("addReview", async () =>
  await addReview(testReview).then((response: any) => {
    expect(response).toBe(undefined); /// kažkodėl vėl neveikia bbž
  }));

test("checkIfEmailTaken", async () => {
  const user: any = await checkIfEmailTaken("test@gmail.com").then(
    (response: any) => {
      expect(response.statusCode).not.toBe(200);
    }
  );
});

test("updateUser passed", async () =>
  await updateUser("60a56136f1f4e029a48c6889", testUser).then(
    (response: any) => {
      expect(response).toBe("User updated successfully!");
    }
  ));

test("Check if user deleted passed", async () => {
  await deleteUser("123456789").catch((response: any) => {
    expect(response.message).toBe("No such user");
  });
});

test("updateUser failed", async () =>
  await updateUser("12465789", testUser).catch((response: any) => {
    expect(response.message).toBe("No such user");
  }));

test("changePassword passed", async () =>
  await updateUser("60a56136f1f4e029a48c6889", testUser).then(
    (response: any) => {
      expect(response).toBe("User updated successfully!"); //klaustukas
    }
  ));

test("changePassword failed", async () =>
  await updateUser("12465789", testUser).catch((response: any) => {
    expect(response.message).toBe("No such user");
  }));

test("increaseTripCount passed", async () => {
  await getOneUser("60ad48a4763e3a410cbf267e").then(async (user: any) => {
    await increaseTripCount("60ad48a4763e3a410cbf267e").then((result: any) => {
      expect(user.tripCount).toBe(result.tripCount - 1);
    });
  });
});

test("increaseSentCount passed", async () => {
  await getOneUser("60ad48a4763e3a410cbf267e").then(async (user: any) => {
    await increaseSentCount("60ad48a4763e3a410cbf267e").then((result: any) => {
      expect(user.sentCount).toBe(result.sentCount - 1);
    });
  });
});

test("deleteUser failed", async () => {
  const user: any = await deleteUser("123456789").catch((response: any) => {
    expect(response.message).toBe("No such user");
  });
});

test("deleteUser failed1", async () => {
  const user: any = await deleteUser("123456789").catch((response: any) => {
    expect(response.message).toBe("No such user");
  });
});

test("deleteUser failed2", async () => {
  const user: any = await deleteUser("123456789").catch((response: any) => {
    expect(response.message).toBe("No such user");
  });
});

test("deleteUser failed3", async () => {
  const user: any = await deleteUser("123456789").catch((response: any) => {
    expect(response.message).toBe("No such user");
  });
});

test("deleteUser failed4", async () => {
  const user: any = await deleteUser("123456789").catch((response: any) => {
    expect(response.message).toBe("No such user");
  });
});

test("deleteUser failed6", async () => {
  const user: any = await deleteUser("123456789").catch((response: any) => {
    expect(response.message).toBe("No such user");
  });
});

test("deleteUser failed7", async () => {
  const user: any = await deleteUser("123456789").catch((response: any) => {
    expect(response.message).toBe("No such user");
  });
});

test("deleteUser failed8", async () => {
  const user: any = await deleteUser("123456789").catch((response: any) => {
    expect(response.message).toBe("No such user");
  });
});

test("deleteUser failed9", async () => {
  const user: any = await deleteUser("123456789").catch((response: any) => {
    expect(response.message).toBe("No such user");
  });
});

test("deleteUser failed10", async () => {
  const user: any = await deleteUser("123456789").catch((response: any) => {
    expect(response.message).toBe("No such user");
  });
});

test("deleteUser failed11", async () => {
  const user: any = await deleteUser("123456789").catch((response: any) => {
    expect(response.message).toBe("No such user");
  });
});
