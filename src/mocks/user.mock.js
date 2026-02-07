import { createHash } from "../utils/index.js";
import { fakerES as fa } from "@faker-js/faker";

export async function generateUsersMock(cantidad) {
  const users = [];
  const hashedPassword = await createHash("coder123");
  for (let i = 0; i < cantidad; i++) {
    let firstName = fa.person.firstName();
    let lastName = fa.person.lastName();
    users.push({
      first_name: firstName,
      last_name: lastName,
      email: fa.internet
        .email({ firstName: firstName, lastName: lastName })
        .toLowerCase(),
      password: hashedPassword,
      role: fa.helpers.arrayElement(["admin", "user"]),
      pets: [],
    });
  }
  return users;
}
