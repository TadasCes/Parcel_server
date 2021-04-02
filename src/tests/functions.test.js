const functions = require("./functions");
const axios = require("axios");

// To be equal
test("Adds 2 + 2 to equal 4", () => {
  expect(functions.add(2, 2)).toBe(4);
});

// To be not equal
test("Adds 2 + 2 to not equal 5", () => {
  expect(functions.add(2, 2)).not.toBe(5);
});

// To be null
test("Should be null", () => {
  expect(functions.isNull()).toBeNull();
});

// To be falsy
test("Should be falsy", () => {
  expect(functions.checkValue(undefined)).toBeFalsy();
});

// To strict equal
test("User should be Jonas Jonaitis object", () => {
  expect(functions.createUser()).toStrictEqual({
    firstName: "Jonas",
    lastName: "Jonaitis",
  });
});

// To be less or equal
test("Should be under 1600", () => {
  const load1 = 800;
  const load2 = 800;
  expect(load1 + load2).toBeLessThanOrEqual(1600);
});

// To not match
test("There is no I in team", () => {
  expect("team").not.toMatch(/I/);
});

// Arrays
test("Admin should be in usernames", () => {
  usernames = ["john", "karen", "admin"];
  expect(usernames).toContain("admin");
});

// Working with async data

// Promise
test("User fetched name should be Leanne Graham (promise)", () => {
  expect.assertions(1);
  return functions.fetchUser().then((data) => {
    expect(data.name).toEqual("Leanne Graham");
  });
});

// Async/await
test("User fetched name should be Leanne Graham (async/await)", async () => {
  expect.assertions(1);
  const data = await functions.fetchUser();
  expect(data.name).toEqual("Leanne Graham");
});

// Error
// test("User fetch should throw error", async () => {
//   jest.spyOn(axios, "get").mockRejectedValue(new Error("error"));
//   const promise = functions.fetchUser();
//   await expect(promise).rejects.toThrow("error");
// });

jest.mock("axios");

describe("#fetchUserFromAPI", () => {
  it("returns data from API", async () => {
    const fetchedUser = await functions.fetchUser();
    expect(fetchedUser.name).toEqual("Leanne Graham");
  });
  it("redirects on a failure", async () => {
    const getError = new Error("error");
    axios.get = jest.fn().mockRejectedValue(getError);
    const actualValue = await functions.fetchUser();
    expect(actualValue).toEqual("error");
  });
});
