import { describe, it } from "mocha";
import supertest from "supertest";
import { expect } from "chai";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { fakerES as fa } from "@faker-js/faker";
import { petsService } from "../../src/services/index.js";

const requester = supertest("http://localhost:8080");
dotenv.config();

describe("Pruebas en adoption.router", function () {
  this.timeout(10_000);
  let fakePet;

  before(async () => {
    await mongoose.connect(process.env.MONGO_URI);
    fakePet = await petsService.create({
      name: "Pepe",
      specie: "Gato",
      birthDate: "2026-01-26",
      adopted: false,
    });
  });

  it("El endpoint /api/adoptions, de método get, retorna un array con todas las adopciones", async () => {
    const resultado = await requester.get("/api/adoptions");

    expect(resultado.status).to.be.equal(200);
    expect(resultado.body).to.have.property("status", "success");
    expect(resultado.body.payload).to.be.an("array");
  });

  it("El endpoint /api/adoptions/:aid, de método get, retorna una adopción realizada", async () => {
    const adoptionId = "69b91ef5e1bb682d469f6444";
    const resultado = await requester.get(`/api/adoptions/${adoptionId}`);

    expect(resultado.status).to.be.equal(200);
    expect(resultado.body.payload).to.have.property("_id");
  });

  it("El endpoint /api/adoptions/:aid, de método get, retorna error 404 si la adopción no existe", async () => {
    const fakeId = "69b91ef5e1bb682d469f6443";
    const resultado = await requester.get(`/api/adoptions/${fakeId}`);

    expect(resultado.status).to.be.equal(404);
  });

  it("El endpoint /api/adoptions/:uid/:pid, de método post, registra una adopción", async () => {
    const uid = "69872e87bcda015e157ebb73";
    const pid = fakePet._id;
    const resultado = await requester.post(`/api/adoptions/${uid}/${pid}`);

    expect(resultado.status).to.be.equal(200);
  });

  it("El endpoint /api/adoptions/:uid/:pid, de método post, retorna un error 404 si el usuario no existe en la DB", async () => {
    const uid = fa.database.mongodbObjectId();
    const pid = "698731a812aad276519c184f";
    const resultado = await requester.post(`/api/adoptions/${uid}/${pid}`);

    expect(resultado.status).to.be.equal(404);
  });

  it("El endpoint /api/adoptions/:uid/:pid, de método post, retorna un error 404 si la mascota no existe en la DB", async () => {
    const uid = "69872e87bcda015e157ebb73";
    const pid = fa.database.mongodbObjectId();
    const resultado = await requester.post(`/api/adoptions/${uid}/${pid}`);

    expect(resultado.status).to.be.equal(404);
  });

  it("El endpoint /api/adoptions/:uid/:pid, de método post, retorna un error 400 si la mascota ya fue adoptada", async () => {
    const uid = "69872e87bcda015e157ebb73";
    const pid = "69872e87bcda015e157ebb76";
    const resultado = await requester.post(`/api/adoptions/${uid}/${pid}`);

    expect(resultado.status).to.be.equal(400);
  });

  after(async () => {
    if (fakePet) {
      await petsService.delete(fakePet._id);
    }
  });
});
