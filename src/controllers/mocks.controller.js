import { generatePetsMock } from "../mocks/pets.mock.js";
import { generateUsersMock } from "../mocks/user.mock.js";
import userModel from "../dao/models/User.js";
import petModel from "../dao/models/Pet.js";

export async function generatePets(req, res) {
  try {
    const pets = await generatePetsMock(50);
    res.status(200).send({ status: "Éxito", payload: pets });
  } catch (error) {
    res
      .status(500)
      .send({ status: "error", message: "La tarea falló con éxito" });
  }
}

export async function generateUsers(req, res) {
  try {
    const users = await generateUsersMock(50);
    res.status(200).send({ status: "Éxito", payload: users });
    return;
  } catch (error) {
    res
      .status(500)
      .send({ status: "error", message: "Oh no, La tarea falló con éxito" });
  }
}

export async function generateData(req, res) {
  try {
    const { users, pets } = req.query;
    const usersQty = Number(users);
    const petsQty = Number(pets);

    const usersMock = await generateUsersMock(usersQty);
    const petsMock = await generatePetsMock(petsQty);

    await userModel.insertMany(usersMock);
    await petModel.insertMany(petsMock);

    res.status(200).send({
      status: "Éxito",
      message: "Datos en la BD",
      usersMock,
      petsMock,
    });
  } catch (error) {
    res
      .status(500)
      .send({ status: "error", message: "La tarea falló con éxito" });
  }
}
