const request = require("supertest");
const initApp = require("../server"); // Your Express app initialization
const mongoose = require("mongoose");
const PostModel = require("../models/posts.model");

let app;
let postId;

beforeAll(async () => {
  app = await initApp();
  await PostModel.deleteMany();
});

afterAll(async () => {
  await mongoose.connection.close();
});

test("Create a new post", async () => {
  const response = await request(app).post("/posts").send({
    title: "Test Post",
    content: "This is test content.",
    owner: "TestOwner",
  });
  expect(response.statusCode).toBe(201);
  expect(response.body.title).toBe("Test Post");
  expect(response.body.content).toBe("This is test content.");
  expect(response.body.owner).toBe("TestOwner");

  postId = response.body._id;
});

test("Get all posts", async () => {
  const response = await request(app).get("/posts");
  expect(response.statusCode).toBe(200);
  expect(response.body.length).toBe(1);
  expect(response.body[0]._id).toBe(postId);
});

test("Get post by ID", async () => {
  const response = await request(app).get(`/posts/${postId}`);
  expect(response.statusCode).toBe(200);
  expect(response.body.title).toBe("Test Post");
  expect(response.body.content).toBe("This is test content.");
  expect(response.body.owner).toBe("TestOwner");
});

test("Get posts by owner", async () => {
  const response = await request(app).get("/posts?owner=TestOwner");
  expect(response.statusCode).toBe(200);
  expect(response.body.length).toBe(1);
  expect(response.body[0].owner).toBe("TestOwner");
});

test("Update post", async () => {
  const updateData = {
    title: "Updated Test Post",
    content: "This is updated content.",
  };

  const response = await request(app).put(`/posts/${postId}`).send(updateData);
  expect(response.statusCode).toBe(200);
  expect(response.body.title).toBe("Updated Test Post");
  expect(response.body.content).toBe("This is updated content.");

  const updatedPost = await PostModel.findById(postId);
  expect(updatedPost.title).toBe("Updated Test Post");
  expect(updatedPost.content).toBe("This is updated content.");
});

test("Fail to update a non-existent post", async () => {
  const fakePostId = new mongoose.Types.ObjectId();
  const response = await request(app).put(`/posts/${fakePostId}`).send({
    title: "Non-existent Post",
  });
  expect(response.statusCode).toBe(404);
  expect(response.text).toBe("Post not found");
});

test("Delete post", async () => {
  const response = await request(app).delete(`/posts/${postId}`);
  expect(response.statusCode).toBe(200);

  const response2 = await request(app).get(`/posts/${postId}`);
  expect(response2.statusCode).toBe(404);
});

test("Fail to delete a non-existent post", async () => {
  const fakePostId = new mongoose.Types.ObjectId();
  const response = await request(app).delete(`/posts/${fakePostId}`);
  expect(response.statusCode).toBe(404);
  expect(response.body).toMatchObject({});
});

test("Fail to create a post with invalid data", async () => {
  const response = await request(app).post("/posts").send({
    title: "",
  });
  expect(response.statusCode).toBe(400);
});
