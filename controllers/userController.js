const { User } = require("../models");

module.exports = {
  // Get all users
  getUser(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single user
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select("-__v")
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new user
  createUser(req, res) {
    console.log(req.body);
    User.create(req.body)
      .then((newUser) => res.json(newUser))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Delete a user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "No user with that ID" })
          : Thought.deleteMany({ _id: { $in: user.thought } })
      )
      .then(() => res.json({ message: "User deleted!" }))
      .catch((err) => res.status(500).json(err));
  },
  //update user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          thoughts: req.body.thoughts,
          friends: req.body.friends,
        },
      },
      { runValidators: true, new: true }
    )
      .select("-__v")
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user to update" });
        } else {
          res.json(user);
        }
      })
      .catch((err) => res.status(500).json(err));
  },

  //BONUS: add friend
  addFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .select("-__v")
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user to update" });
        } else {
          res.json(user);
        }
      })
      .catch((err) => res.status(500).json(err));
  },

  //and delete
  deleteFriend(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .select("-__v")
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: "No user to update" });
        } else {
          res.json(user);
        }
      })
      .catch((err) => res.status(500).json(err));
  },
};
