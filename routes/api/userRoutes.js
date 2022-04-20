const router = require("express").Router();
const {
  getUser,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/UserController");

// /api/Users
router.route("/").get(getUser).post(createUser);

// /api/Users/:id
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/Users/:UserId/friends/id
router.route("/:userId/friends/:friendId").post(addFriend).delete(deleteFriend);

module.exports = router;
