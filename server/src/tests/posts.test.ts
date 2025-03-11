// import request from "supertest";
// import initApp from "../server";
// import mongoose from "mongoose";
// import postModel from "../models/posts.model";
// import userModel, { IUser } from "../models/users.model";

// import serverPromise from "../server";
// import { Server as HttpServer } from "http";

// let app: HttpServer;

// type User = IUser & { token?: string };
// const testUser: User = {
//   _id: Object("67cee6ba509c96fd4269eea1"),
//   email: "testingUser@gmail.com",
//   password: "Aa123456",
//   username: "usertest",
//   avatar: "1741618185815.44.01.png",
// };

// beforeAll(async () => {
//   console.log("beforeAll");
//   app = (await serverPromise).server;
//   await postModel.deleteMany();
//   await userModel.deleteMany();
//   await request(app).post("/auth/register").send(testUser);

//   const res = await request(app).post("/auth/login").send(testUser);

//   console.log("Login Response:", res.body);

//   testUser.token = res.body.refreshToken;
//   testUser._id = res.body._id;

//   expect(testUser.token).toBeDefined();
// });

// afterAll((done) => {
//   console.log("afterAll");
//   mongoose.connection.close();
//   done();
// });

// let postId = "";
// describe("Posts Tests", () => {
//   test("Posts test get all", async () => {
//     const response = await request(app).get("/posts");
//     expect(response.statusCode).toBe(200);
//     expect(response.body.length).toBe(0);
//   });

//   test("Test Create Post", async () => {
//     const response = await request(app)
//       .post("/posts")
//       .set("Authorization", `Bearer ${testUser.token}`)
//       .send({
//         title: "Test Post",
//         content: "Test Content",
//         owner: "TestOwner",
//       });
//     expect(response.statusCode).toBe(201);
//     expect(response.body.title).toBe("Test Post");
//     expect(response.body.content).toBe("Test Content");
//     postId = response.body._id;
//   });

//   test("Test get post by owner", async () => {
//     const response = await request(app).get(`/posts?owner=${testUser._id}`);
//     expect(response.statusCode).toBe(200);
//     expect(response.body.length).toBe(1);
//     expect(response.body[0].title).toBe("Test Post");
//     expect(response.body[0].content).toBe("Test Content");
//   });

//   test("Test get post by id", async () => {
//     const response = await request(app).get(`/posts/${postId}`);
//     expect(response.statusCode).toBe(200);
//     expect(response.body.title).toBe("Test Post");
//     expect(response.body.content).toBe("Test Content");
//   });

//   test("Test Create Post 2", async () => {
//     const response = await request(app)
//       .post("/posts")
//       .set("Authorization", `Bearer ${testUser.token}`)
//       .send({
//         title: "Test Post 2",
//         content: "Test Content 2",
//         owner: "TestOwner2",
//       });
//     expect(response.statusCode).toBe(201);
//   });

//   test("Posts test get all 2", async () => {
//     const response = await request(app).get("/posts");
//     expect(response.statusCode).toBe(200);
//     expect(response.body.length).toBe(2);
//   });

//   test("Test Delete Post", async () => {
//     const response = await request(app)
//       .delete(`/posts/${postId}`)
//       .set("Authorization", `Bearer ${testUser.token}`);
//     expect(response.statusCode).toBe(200);
//     const response2 = await request(app).get(`/posts/${postId}`);
//     expect(response2.statusCode).toBe(404);
//   });

//   test("Test Create Post fail", async () => {
//     const response = await request(app)
//       .post("/posts")
//       .set("Authorization", `Bearer ${testUser.token}`)
//       .send({
//         content: "Test Content 2", // should fail
//       });
//     expect(response.statusCode).toBe(400);
//   });
// });
