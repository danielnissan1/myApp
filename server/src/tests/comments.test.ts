import request from "supertest";
import mongoose from "mongoose";
import commentsModel from "../models/comments.model";
// import testComments from "./test_comments.json";
import { IUser } from "../models/users.model";
import serverPromise from "../server";
import { Server as HttpServer } from "http";

type User = IUser & { accessToken?: string; refreshToken?: string };
const testUser: User = {
  _id: Object("67cee6ba509c96fd4269eea1"),
  email: "testingUser@gmail.com",
  password: "Aa123456",
  username: "usertest",
  avatar: "1741618185815.44.01.png",
};

const testComments = [
  {
    comment: "This is a comment",
    owner: testUser._id,
    postId: "",
  },
];

let post;
let testComment;

let app: HttpServer;
beforeAll(async () => {
  console.log("beforeAll");
  app = (await serverPromise).server;
  await commentsModel.deleteMany();

  const res = await request(app).post("/api/auth/login").send(testUser);
  console.log("Login Response:", res.body);

  if (res.body && res.body.refreshToken) {
    testUser.accessToken = res.body.refreshToken;
    testUser._id = res.body._id;
    console.log("Token set:", testUser.accessToken);
  } else {
    console.error("Failed to get token from login response");
    throw new Error("Failed to get token from login response");
  }

  expect(testUser.accessToken).toBeDefined();

  post = await request(app)
    .post("/api/posts")
    .set({ authorization: "JWT " + testUser.accessToken })
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

  testComment = {
    comment: "This is a comment",
    owner: testUser._id,
    postId: post.body._id,
  };

  testComments[0].postId = post.body._id;
  testComments[0].owner = testUser._id;
});

afterAll((done) => {
  console.log("afterAll");
  mongoose.connection.close();
  done();
});

let commentId = "";

describe("Comments Tests", () => {
  test("Comments test All", async () => {
    const response = await request(app).get(`/api/comments`);
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(0);
  });

  test("Test Create Comment", async () => {
    const response = await request(app)
      .post("/api/comments")
      .set("Authorization", `Bearer ${testUser.accessToken}`)
      .send(testComments[0]);
    expect(response.statusCode).toBe(201);
    expect(response.body.comment).toBe(testComments[0].comment);
    expect(response.body.postId).toBe(testComments[0].postId);
    expect(response.body.owner).toBe(testComments[0].owner);
    commentId = response.body._id;
  });

  test("Test get comment by post", async () => {
    const response = await request(app).get(
      "/api/comments/" + testComments[0].postId
    );
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].comment).toBe(testComments[0].comment);
    expect(response.body[0].postId).toBe(testComments[0].postId);
    expect(response.body[0].owner._id).toBe(testComments[0].owner);
  });
});
