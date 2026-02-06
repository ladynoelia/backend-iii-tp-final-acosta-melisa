import { fakerES as fa } from "@faker-js/faker";

export async function generatePetsMock(cantidad) {
  const pets = [];

  for (let i = 0; i < cantidad; i++) {
    pets.push({
      name: fa.animal.petName(),
      specie: fa.helpers.arrayElement([
        "Perro",
        "Gato",
        "Conejo",
        "Pez",
        "Cobayo",
        "Tortuga",
      ]),
      birthdate: fa.date.between({ from: "2020-01-01", to: Date.now() }),
      adopted: fa.datatype.boolean({ probability: 0.1 }),
    });
  }
  return pets;
}
