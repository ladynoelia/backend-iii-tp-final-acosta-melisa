import { createHash } from "../utils/index.js";
import { fakerES as fa } from "@faker-js/faker";

export async function generateUsersMock(cantidad) {
  const users = [];
  const hashedPassword = await createHash("coder123");
  for (let i = 0; i < cantidad; i++) {
    users.push({
      _id: fa.database.mongodbObjectId(),
      firstName: fa.person.firstName(),
      lastName: fa.person.lastName(),
      email: fa.internet.email({ firstName: firstName, lastName: lastName }),
      password: hashedPassword,
      role: fa.helpers.arrayElement(["admin", "user"]),
      pets: [],
    });
  }
  return users;
}
