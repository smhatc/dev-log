// SETUP
const express = require("express");
const router = express.Router();
const Post = require("../models/Post.js");

// ROUTES
router.get("/", async (req, res) => {
    const foundPosts = await Post.find();
    res.render("./posts/index.ejs", { foundPosts, });
});

router.post("/", async (req, res) => {
    res.send("Hello, world!");
});

router.get("/new", (req, res) => {
    res.send("Hello, world!");
});

router.get("/:postId", (req, res) => {
    res.send("Hello, world!");
});

router.put("/:postId", (req, res) => {
    res.send("Hello, world!");
});

router.delete("/:postId", (req, res) => {
    res.send("Hello, world!");
});

router.get("/:postId/edit", (req, res) => {
    res.send("Hello, world!");
});

// EXPORTING ROUTES
module.exports = router;