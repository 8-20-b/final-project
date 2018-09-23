const Comment = require("../models").Comment;
const User = require("../models").User;

const getAll = (req, res) => {
  Comment.findAll({
    where: { movieId: req.params.movie_id },
    include: [{ model: User }]
  })
    .then(comments => {
      const output = comments.map(comment => {
        //tidy up the user data
        return Object.assign(
          {},
          {
            userId: comment.User.userId,
            firstName: comment.User.firstName,
            lastName: comment.User.lastName,
            profile: comment.User.profilePic,
            createdAt: comment.createdAt,
            comment: comment.comment,
            commentId: comment.commentId
          }
        );
      });
      res.json(output);
    })
    .catch(err => console.log({ success: false, message: err }));
};

const create = (req, res) => {
  const { comment, movieId, userId } = req.body;
  Comment.create({ comment, movieId, userId })
    .then(c => res.json({ success: true, data: c }))
    .catch(() => res.json({ success: false }));
};

const update = (req, res) => {
  const { comment } = req.body;
  Comment.update({ comment }, { where: { commentId: req.params.comment_id } })
    .then(() => res.json({ success: true }))
    .catch(() => res.json({ success: false }));
};

const remove = (req, res) => {
  Comment.destroy({ where: { commentId: req.params.comment_id } })
    .then(() => res.json({ success: true }))
    .catch(err => res.json({ success: false, message: err }));
};

module.exports = { getAll, create, update, remove };
