const express = require("express");
const {
  getUser,
  getRoles,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const authentificated = require("../middlewares/authentificated");
const mapUser = require("../helpers/mapUser");
const hasRole = require("../middlewares/hasRole");
const ROLES = require("../constants/roles");

const router = express.Router({ mergeParams: true });

router.get("/", authentificated, hasRole([ROLES.ADMIN]), async (req, res) => {
  const users = await getUser();
  res.send({ data: users.map(mapUser) });
});

router.get(
  "/roles",
  authentificated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    const roles = getRoles();
    res.send({ data: roles });
  }
);

router.patch(
  "/:id",
  authentificated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    const newUser = await updateUser(req.params.id, {
      role: req.body.roleId,
    });
    res.send({ data: mapUser(newUser) });
  }
);

router.delete(
  "/:id",
  authentificated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    await deleteUser(req.params.id);

    res.send({ error: null });
  }
);

module.exports = router;
