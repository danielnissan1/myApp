import request from "supertest";
import initApp from "../server";
import mongoose from "mongoose";
import postModel from "../models/posts.model";
import userModel, { IUser } from "../models/users.model";

import serverPromise from "../server";
import { Server as HttpServer } from "http";

let app: HttpServer;

type User = IUser & { token?: string };
const testUser: User = {
  _id: Object("67cee6ba509c96fd4269eea1"),
  email: "testingUser@gmail.com",
  password: "Aa123456",
  username: "usertest",
  avatar: "1741618185815.44.01.png",
};

beforeAll(async () => {
  console.log("beforeAll");
  app = (await serverPromise).server;
  await postModel.deleteMany();
  await userModel.deleteMany();
  await request(app).post("/auth/register").send(testUser);

  const res = await request(app).post("/auth/login").send(testUser);

  console.log("Login Response:", res.body);

  testUser.token = res.body.refreshToken;
  testUser._id = res.body._id;

  expect(testUser.token).toBeDefined();
});

afterAll((done) => {
  console.log("afterAll");
  mongoose.connection.close();
  done();
});

let postId = "";
describe("Posts Tests", () => {
  test("Posts test get all", async () => {
    const response = await request(app).get("/posts");
    expect(response.statusCode).toBe(200);
    expect(response.body.posts.length).toBe(0);
  });

  test("Test Create Post", async () => {
    const response = await request(app)
      .post("/posts")
      .set({ authorization: "JWT " + testUser.token })
      .send({
        owner: testUser._id,
        imgSrc: "https://example.com/image.jpg",
        content: "This is a test item for sale. Great condition.",
        location: "New York, USA",
        isSold: false,
        date: new Date(),
        price: 150,
        likes: [
          new mongoose.Types.ObjectId("507f1f77bcf86cd799439012"),
          new mongoose.Types.ObjectId("507f1f77bcf86cd799439013"),
        ],
      });
    expect(response.statusCode).toBe(201);
    expect(response.body.content).toBe(
      "This is a test item for sale. Great condition."
    );
    postId = response.body._id;
  });

  test("Test get post by owner", async () => {
    const response = await request(app).get(`/posts?owner=${testUser._id}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.posts.length).toBe(1);
    expect(response.body.posts[0].content).toBe(
      "This is a test item for sale. Great condition."
    );
  });

  test("Test get post by id", async () => {
    const response = await request(app)
      .get(`/posts/${postId}`)
      .set({ authorization: "JWT " + testUser.token });
    expect(response.statusCode).toBe(200);
  });

  test("Posts test get all 2", async () => {
    const response = await request(app).get("/posts");
    expect(response.statusCode).toBe(200);
    expect(response.body.posts.length).toBe(1);
  });

  test("Test add like", async () => {
    console.log("postid", postId), console.log("userid", testUser._id);
    const response = await request(app)
      .post("/posts/addlike")
      .set({ authorization: "JWT " + testUser.token })
      .send({
        postId: postId,
        userId: testUser._id,
      });
    console.log("response", response.body);
    expect(response.statusCode).toBe(200);
  });

  test("Test delete like", async () => {
    const response = await request(app)
      .post("/posts/removelike")
      .set({ authorization: "JWT " + testUser.token })
      .send({
        postId: postId,
        userId: testUser._id,
      });
    expect(response.statusCode).toBe(200);
  });

  test("Test Delete Post", async () => {
    const response = await request(app)
      .delete(`/posts/${postId}`)
      .set({ authorization: "JWT " + testUser.token });
    expect(response.statusCode).toBe(200);
  });

  test("Test update post", async () => {
    const response = await request(app)
      .post("/posts")
      .set({ authorization: "JWT " + testUser.token })
      .send({
        owner: testUser._id,
        imgSrc: "https://example.com/image.jpg",
        content: "This is my first content",
        location: "New York, USA",
        isSold: false,
        date: new Date(),
        price: 150,
        likes: [
          new mongoose.Types.ObjectId("507f1f77bcf86cd799439012"),
          new mongoose.Types.ObjectId("507f1f77bcf86cd799439013"),
        ],
      });
    expect(response.statusCode).toBe(201);
    expect(response.body.content).toBe("This is my first content");
    console.log("ffffff ", response.body);

    let testpost = response.body;
    testpost.content = "This is a test item for sale. Great condition.";
    console.log("testpost", testpost);
    const response2 = await request(app)
      .put(`/posts/${testpost._id}`)
      .set({ authorization: "JWT " + testUser.token })
      .send({
        testpost,
      });
    expect(response2.statusCode).toBe(200);
  });

  test("Test get deleted Post", async () => {
    const response2 = await request(app)
      .get(`/posts/${postId}`)
      .set({ authorization: "JWT " + testUser.token });
    expect(response2.body.length).toBe(0);
  });

  test("Test Create Post fail", async () => {
    const response = await request(app)
      .post("/posts")
      .set({ authorization: "JWT " + testUser.token })
      .send({
        content: "Test Content 2", // should fail
      });
    expect(response.statusCode).toBe(400);
  });
});
