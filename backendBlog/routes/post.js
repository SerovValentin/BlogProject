const express = require("express");

const {
  getPost,
  getPosts,
  addPost,
  deletePost,
  editPost,
} = require("../controllers/post");

const { addComment, deleteComment } = require("../controllers/coments");
const mapPost = require("../helpers/mapPost");
const mapComment = require("../helpers/mapComment");
const authentificated = require("../middlewares/authentificated");
const hasRole = require("../middlewares/hasRole");
const ROLES = require("../constants/roles");

const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
  const { posts, lastPage } = await getPosts(
    req.query.search,
    req.query.limit,
    req.query.page
  );
  res.send({ data: { lastPage, posts: posts.map(mapPost) } });
});

router.get("/:id", async (req, res) => {
  const post = await getPost(req.params.id);

  res.send({ data: mapPost(post) });
});

router.post("/:id/comments", authentificated, async (req, res) => {
  const newComment = await addComment(req.params.id, {
    content: req.body.content,
    author: req.user.id,
  });
  res.send({ data: mapComment(newComment) });
});

router.delete(
  "/:postId/comments/:commentId",
  authentificated,
  hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
  async (req, res) => {
    await deleteComment(req.params.postId, req.params.commentId);
    res.send({ error: null });
  }
);

router.post("/", authentificated, hasRole([ROLES.ADMIN]), async (req, res) => {
  const newPost = await addPost({
    title: req.body.title,
    content: req.body.content,
    imageUrl: req.body.imageUrl,
  });
  res.send({ data: mapPost(newPost) });
});

router.patch(
  "/:id",
  authentificated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    const updatePost = await editPost(req.params.id, {
      title: req.body.title,
      content: req.body.content,
      imageUrl: req.body.imageUrl,
    });
    res.send({ data: mapPost(updatePost) });
  }
);

router.delete(
  "/:id",
  authentificated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    await deletePost(req.params.id);
    res.send({ error: null });
  }
);

module.exports = router;
