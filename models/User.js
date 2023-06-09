const Mongoose = require("mongoose");
const UserSchema = new Mongoose.Schema({
  username: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  email: {
    type: String,
    required: false,
    min: 6,
    max: 225,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 255,
  },
  roles: [
    {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "Role",
      default: "admin",
    },
  ],
});
const User = Mongoose.model("user", UserSchema);
module.exports = User;
