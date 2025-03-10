// import { Express } from "express";
// import userModel, { IUser } from "../models/users.model";
// import initApp from "../server";
// import mongoose from "mongoose";
// import request from "supertest";
// import postModel from "../models/posts.model";

// var app: Express;
// const baseAuthUrl = "/auth";

// type User = IUser & {
//   accessToken?: string;
//   refreshToken?: string;
// };

// const testUser: User = {
//   email: "testingUser@gmail.com",
//   password: "Aa123456",
// };

// beforeAll(async () => {
//   console.log("before all Tests");
//   app = await initApp();
//   await userModel.deleteMany();
//   await postModel.deleteMany();
// });

// afterAll((done) => {
//   console.log("after all tests");
//   mongoose.connection.close();
//   done();
// });

// describe("Auth Tests", () => {
//   //Register tests
//   test("Auth test register", async () => {
//     const response = await request(app)
//       .post(baseAuthUrl + "/register")
//       .send(testUser);
//     expect(response.statusCode).toBe(200);
//   });

//   test("Auth test register fail", async () => {
//     const firstResponse = await request(app)
//       .post(baseAuthUrl + "/register")
//       .send({
//         email: "jestAnEmail@gmail.com",
//       });
//     expect(firstResponse.statusCode).not.toBe(200);

//     const secondResponse = await request(app)
//       .post(baseAuthUrl + "/register")
//       .send({
//         email: "",
//         password: "justAPassword",
//       });
//     expect(secondResponse.statusCode).not.toBe(200);
//   });

//   //Login tests
//   test("Auth test login", async () => {
//     const response = await request(app)
//       .post(baseAuthUrl + "/login")
//       .send(testUser);
//     expect(response.statusCode).toBe(200);

//     const accessToken = response.body.accessToken;
//     const refreshToken = response.body.refreshToken;
//     expect(accessToken).toBeDefined();
//     expect(refreshToken).toBeDefined();
//     expect(response.body._id).toBeDefined();
//     testUser.accessToken = accessToken;
//     testUser.refreshToken = refreshToken;
//     testUser._id = response.body._id;
//   });

//   test("Check tokens are not the same", async () => {
//     const response = await request(app)
//       .post(baseAuthUrl + "/login")
//       .send(testUser);
//     const accessToken = response.body.accessToken;
//     const refreshToken = response.body.refreshToken;

//     expect(accessToken).not.toBe(testUser.accessToken);
//     expect(refreshToken).not.toBe(testUser.refreshToken);
//   });

//   test("Auth test login fail", async () => {
//     const firstResponse = await request(app)
//       .post(baseAuthUrl + "/login")
//       .send({
//         email: testUser.email,
//         password: "123456789",
//       });
//     expect(firstResponse.statusCode).not.toBe(200);

//     const secondResponse = await request(app)
//       .post(baseAuthUrl + "/login")
//       .send({
//         email: "randomEmail@user.com",
//         password: "123456789",
//       });
//     expect(secondResponse.statusCode).not.toBe(200);
//   });

//   test("Auth test me", async () => {
//     const firstResponse = await request(app).post("/posts").send({
//       title: "Test Post",
//       content: "Test Content",
//       owner: "sdfSd",
//     });
//     expect(firstResponse.statusCode).not.toBe(201);

//     const secondResponse = await request(app)
//       .post("/posts")
//       .set({ authorization: "JWT " + testUser.accessToken })
//       .send({
//         title: "Test Post",
//         content: "Test Content",
//         owner: "sdfSd",
//       });
//     expect(secondResponse.statusCode).toBe(201);
//   });

//   //Refresh tests
//   test("Test refresh token", async () => {
//     const response = await request(app)
//       .post(baseAuthUrl + "/refresh")
//       .send({
//         refreshToken: testUser.refreshToken,
//       });
//     expect(response.statusCode).toBe(200);
//     expect(response.body.accessToken).toBeDefined();
//     expect(response.body.refreshToken).toBeDefined();
//     testUser.accessToken = response.body.accessToken;
//     testUser.refreshToken = response.body.refreshToken;
//   });

//   test("Double use refresh token", async () => {
//     const firstResponse = await request(app)
//       .post(baseAuthUrl + "/refresh")
//       .send({
//         refreshToken: testUser.refreshToken,
//       });
//     expect(firstResponse.statusCode).toBe(200);
//     const refreshTokenNew = firstResponse.body.refreshToken;

//     const secondResponse = await request(app)
//       .post(baseAuthUrl + "/refresh")
//       .send({
//         refreshToken: testUser.refreshToken,
//       });
//     expect(secondResponse.statusCode).not.toBe(200);

//     const thirdResponse = await request(app)
//       .post(baseAuthUrl + "/refresh")
//       .send({
//         refreshToken: refreshTokenNew,
//       });
//     expect(thirdResponse.statusCode).not.toBe(200);
//   });

//   test("Test logout", async () => {
//     const firstResponse = await request(app)
//       .post(baseAuthUrl + "/login")
//       .send(testUser);
//     expect(firstResponse.statusCode).toBe(200);
//     testUser.accessToken = firstResponse.body.accessToken;
//     testUser.refreshToken = firstResponse.body.refreshToken;

//     const secondResponse = await request(app)
//       .post(baseAuthUrl + "/logout")
//       .send({
//         refreshToken: testUser.refreshToken,
//       });
//     expect(secondResponse.statusCode).toBe(200);

//     const thirdResponse = await request(app)
//       .post(baseAuthUrl + "/refresh")
//       .send({
//         refreshToken: testUser.refreshToken,
//       });
//     expect(thirdResponse.statusCode).not.toBe(200);
//   });

//   jest.setTimeout(10000);
//   test("Test timeout token ", async () => {
//     const firstResponse = await request(app)
//       .post(baseAuthUrl + "/login")
//       .send(testUser);
//     expect(firstResponse.statusCode).toBe(200);
//     testUser.accessToken = firstResponse.body.accessToken;
//     testUser.refreshToken = firstResponse.body.refreshToken;

//     await new Promise((resolve) => setTimeout(resolve, 5000));

//     const secondResponse = await request(app)
//       .post("/posts")
//       .set({ authorization: "JWT " + testUser.accessToken })
//       .send({
//         title: "Test Post",
//         content: "Test Content",
//         owner: "sdfSd",
//       });
//     expect(secondResponse.statusCode).toBe(201);

//     const thirdResponse = await request(app)
//       .post(baseAuthUrl + "/refresh")
//       .send({
//         refreshToken: testUser.refreshToken,
//       });
//     expect(thirdResponse.statusCode).toBe(200);
//     testUser.accessToken = thirdResponse.body.accessToken;

//     const fourthResponse = await request(app)
//       .post("/posts")
//       .set({ authorization: "JWT " + testUser.accessToken })
//       .send({
//         title: "Test Post",
//         content: "Test Content",
//         owner: "sdfSd",
//       });
//     expect(fourthResponse.statusCode).toBe(201);
//   });
// });
