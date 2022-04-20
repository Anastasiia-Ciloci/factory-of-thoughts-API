const { Thought } = require("../models");

module.exports = {
  // Get all thougtss
  getThought(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select("-__v")
      .then((thought) =>
        !thought
          ? res
              .status(404)
              .json({ message: "There is no thought found with that ID" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },

  // Delete a Thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId }).then((thought) =>
      !thought
        ? res.status(404).json({ message: "No thought with that ID" })
        : res
            .json(`Deleted thought ${thought.thoughtText}`)

            .then(() => res.json({ message: "Thought and user deleted!" }))
            .catch((err) => res.status(500).json(err))
    );
  },

  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  //create Reaction

  addReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      {
        $push: {
          reactions: {
            reactionBody: req.body.reactionBody,
            username: req.body.username,
          },
        },
      },
      { runValidators: true, new: true }
    )
      .select("-__v")
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thought with that ID" });
        } else {
          res.json(thought);
        }
      })
      .catch((err) => res.status(500).json(err));
  },
  //delete reaction

  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: req.params.reactionId } },
      { runValidators: true, new: true }
    )
      .select("-__v")
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: "No thought to update" });
        } else {
          res.json(thought);
        }
      })
      .catch((err) => res.status(500).json(err));
  },
};
