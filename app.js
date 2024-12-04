const express = require("express");
const app = express();
const path = require("path");
const userModel = require("./models/user");
const postModel = require("./models/posts");
const jwt = require("jsonwebtoken");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/create", async (req, res) => {
  let user = await userModel.create({
    username: "Samreen",
    email: "sam@gmail.com",
    age: 30,
  });
  res.send(user);
});

app.get("/post/create", async (req, res) => {
  let post = await postModel.create({
    postData: "Hi, I am writing my first post",
    user: "674f61450400dca332706a23",
  });

  let user = await userModel.findOne({ _id: "674f61450400dca332706a23" });
  user.posts.push(post._id);
  await user.save();
  res.send({ post, user });
});

app.listen(3000);
