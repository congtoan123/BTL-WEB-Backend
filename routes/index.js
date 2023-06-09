const BookRouter = require('./book');
const LoginRouter = require("./login")
const CommentRoute = require("./comment")
const OrderRoute = require("./Order")

function route(app) {
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept,Authorization"
        );
        next();
      })
    app.use('/book', BookRouter);
    app.use('/comment',CommentRoute);
    app.use('/auth', LoginRouter);
    app.use('/order',OrderRoute)
}

module.exports = route;