const Comment = require("../models/Comment");
const User = require("../models/User");
class CommentController {
  getBookcomment (req, res, next) {
    Comment.find({ Book: req.params.id })
            .then((comment)=>{
                res.json(
                    comment
                )
            }
                )
            .catch(next)
  }

  uploadcomment= async (req, res, next) => {
    const user = await User.findOne({
        username: req.body.User,
      })
    const comment = new Comment({
        Book : req.body.Book,
        Description : req.body.Description,
        Star : req.body.Star,
        User :user
    });
    comment
      .save()
      .then(() => res.sendStatus(200))
      .catch(next);
  }
}

module.exports = new CommentController()