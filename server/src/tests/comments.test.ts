import request from "supertest";
import initApp from "../server";
import mongoose from "mongoose";
import commentsModel from "../models/comments.model";
import { Express } from "express";
import testComments from "./test_comments.json";
import { IUser } from "../models/users.model";

type User = IUser & { token?: string };
const testUser: User = {
  email: "test@user.com",
  password: "testpassword",
  username: "Maya",
  avatar: "http://localhost:3001/public/1741545404419.35.23.png",
};

let post;
let testComment;

var app: Express;

beforeAll(async () => {
  console.log("beforeAll");
  app = await initApp();
  await commentsModel.deleteMany();

  const res = await request(app).post("/auth/login").send(testUser);
  console.log("Login Response:", res.body);

  testUser.token = res.body.refreshToken;
  testUser._id = res.body._id;

  expect(testUser.token).toBeDefined();
  post = await request(app)
    .post("/posts")
    .set("Authorization", `Bearer ${testUser.token}`)
    .send({
      title: "Test Post",
      content: "Test Content",
      owner: "TestOwner",
    });

  testComment = {
    comment: "This is a comment",
    owner: "Daniel",
    postId: post.body._id,
  };
});

afterAll((done) => {
  console.log("afterAll");
  mongoose.connection.close();
  done();
});

let commentId = "";

describe("Comments Tests", () => {
  test("Comments test get all", async () => {
    const response = await request(app).get("/comments");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(0);
  });

  test("Test Create Comment", async () => {
    const response = await request(app)
      .post("/comments")
      .set("Authorization", `Bearer ${testUser.token}`)
      .send(testComments[0]);
    expect(response.statusCode).toBe(201);
    expect(response.body.comment).toBe(testComments[0].comment);
    expect(response.body.postId).toBe(testComments[0].postId);
    expect(response.body.owner).toBe(testComments[0].owner);
    commentId = response.body._id;
  });

  test("Test get comment by owner", async () => {
    const response = await request(app).get(
      "/comments?owner=" + testComments[0].owner
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].comment).toBe(testComments[0].comment);
    expect(response.body[0].postId).toBe(testComments[0].postId);
    expect(response.body[0].owner).toBe(testComments[0].owner);
  });

  test("Comments get by id", async () => {
    const response = await request(app).get("/comments/" + commentId);
    expect(response.statusCode).toBe(200);
    expect(response.body.comment).toBe(testComments[0].comment);
    expect(response.body.postId).toBe(testComments[0].postId);
    expect(response.body.owner).toBe(testComments[0].owner);
  });

  test("Test Delete comment", async () => {
    const response = await request(app)
      .delete("/comments/" + commentId)
      .set("Authorization", `Bearer ${testUser.token}`);
    expect(response.statusCode).toBe(200);
    const response2 = await request(app).get("/comments/" + commentId);
    expect(response2.statusCode).toBe(404);
  });

  test("Test Create Post fail", async () => {
    const response = await request(app).post("/comments").send(testComments[1]);
    expect(response.statusCode).toBe(401);
  });
});
