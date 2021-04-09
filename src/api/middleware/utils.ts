import bcrypt from "bcrypt";

const saltRounds = 10;
function hashPassword(password) {
  return bcrypt
    .hash(password, saltRounds)
    .then((result) => {
      return result;
    })
    .catch((error) => {
      throw new Error(error);
    });
}

export { hashPassword };
