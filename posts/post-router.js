const express = require("express");

// database access using knex
const knex = require("../data/db-config.js");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await knex.select("*").from("posts");
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const postByID = await knex
      .select("*")
      .from("posts")
      .where("id", req.params.id);
    res.status(200).json({ postByID });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const newPost = await knex
      .select("*")
      .from("posts")
      .insert(req.body);
    console.log(newPost);
    const newPostByID = await knex
      .select("*")
      .from("posts")
      .where("id", newPost[0]);
    res.status(200).json({ newPostByID });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const update = await knex
      .select("*")
      .from("posts")
      .where("id", req.params.id)
      .update(req.body);
    console.log(update);
    res.status(200).json({ message: "Post successfully updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await knex
      .select("*")
      .from("posts")
      .where("id", req.params.id)
      .del();
    res.status(200).json({ deleted });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
