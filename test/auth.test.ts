// const chai = require("chai");
const request = require("supertest");

const app = require("../src/server");

describe("Testing Auth Module", () => {
  it("Test Case 1: Signup", () => {
    request(app)
      .post("/auth/signup")
      .send({
        email: "test@gmail.com",
        password: "testing123",
        name: "Test 1",
      })
      .expect(200);
  });

  it("Test Case 2: Login", () => {
    request(app)
      .post("/auth/login")
      .send({
        email: "test@gmail.com",
        password: "testing123",
      })
      .expect(200);
  });

  it("Test Case 3: Login should fail", () => {
    request(app)
      .post("/auth/login")
      .send({
        email: "test@gmail.com",
        password: "testing",
      })
      .expect(403);
  });
});
