const User = require("../models/User");
const Order = require("../models/Order");
const Book = require("../models/Book.js");

class OrderController {
  getOrder = async (req, res, next) => {
    const user = await User.find({
      username: req.params.username,
    });
    Order.find({ User: user}).populate('Book')
      .then((order) => {
        res.json(order);
      })
      .catch(next);
  }
  AddOrder = async (req, res, next) => {
    const user = await User.findOne({
      username: req.query.username,
    });
    const book = await Book.findOne({
      _id: req.query.BookId,
    });
    const order = new Order({
      Phone: req.body.Phone,
      Name: req.body.Name,
      Address: req.body.Address,
      Email: req.body.Email,
      Payment: req.body.Payment,
      Country: req.body.Country,
      City: req.body.City,
      Zipcode: req.body.Zipcode,
      Shipping: req.body.Shipping,
      Quantity: req.body.quantity,
      Book: book,
      User: user,
    });
    order
      .save()
      .then(() => res.sendStatus(200))
      .catch(next);
  };
  DeleteOrder = async (req, res, next) => {
    await Order.delete({
      _id: req.params.id,
    }).then(res.sendStatus(200)).catch(next);
  };
}

module.exports = new OrderController();
