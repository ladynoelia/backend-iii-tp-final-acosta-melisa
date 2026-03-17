import { describe, it } from "mocha";
import supertest from "supertest";
import { expect } from "chai";

const requester = supertest("http://localhost:8080");

describe("Pruebas en adoption.router", () => {
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
    expect(resultado.body.payload).to.have.property("status", "error");
  });

  it("El endpoint /api/adoptions/:uid/:pid, de método post, registra una adopción", async () => {
    const uid = "698731a812aad276519c184d";
    const pid = "69872e87bcda015e157ebb78";
    const resultado = await requester.post(`/api/adoptions/${uid}/${pid}`);

    expect(resultado.status).to.be.equal(200);
    expect(resultado.body.payload).to.have.property("status", "success");
  });

  it("El endpoint /api/adoptions/:uid/:pid, de método post, retorna un error 404 si el usuario no existe en la DB", async () => {
    const uid = "69872e87bcda015e157ebb37";
    const pid = "698731a812aad276519c184f";
    const resultado = await requester.post(`/api/adoptions/${uid}/${pid}`);

    expect(resultado.status).to.be.equal(404);
    expect(resultado.body.payload).to.have.property("status", "error");
  });

  it("El endpoint /api/adoptions/:uid/:pid, de método post, retorna un error 404 si la mascota no existe en la DB", async () => {
    const uid = "69872e87bcda015e157ebb73";
    const pid = "698731a812aad276519c184g";
    const resultado = await requester.post(`/api/adoptions/${uid}/${pid}`);

    expect(resultado.status).to.be.equal(404);
    expect(resultado.body.payload).to.have.property("status", "error");
  });

  it("El endpoint /api/adoptions/:uid/:pid, de método post, retorna un error 404 si la mascota ya fue adoptada", async () => {
    const uid = "69872e87bcda015e157ebb73";
    const pid = "69872e87bcda015e157ebb77";
    const resultado = await requester.post(`/api/adoptions/${uid}/${pid}`);

    expect(resultado.status).to.be.equal(400);
  });
});
