const User = require("../models/User");
const Role = require("../models/Roles");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const config = require("../config/auth.config");

class LoginController {
  Signup = async (request, response) => {
    const checkusername = await User.findOne({
      username: request.body.username,
    });

    if (checkusername) return response.status(422).send("username is exist");

    const user = new User({
      username: request.body.username,
      email: request.body.email,
      password: bcrypt.hashSync(request.body.password, 8),
    });

    user.save((err, user) => {
      if (err) {
        response.status(500).send({ message: err });
        return;
      }

      if (request.body.roles) {
        Role.find(
          {
            name: { $in: request.body.roles },
          },
          (err, roles) => {
            if (err) {
              response.status(500).send({ message: err });
              return;
            }

            user.roles = roles.map((role) => role._id);
            user.save((err) => {
              if (err) {
                response.status(500).send({ message: err });
                return;
              }

              response.send({ message: "User was registered successfully!" });
            });
          }
        );
      } else {
        Role.findOne({ name: "user" }, (err, role) => {
          if (err) {
            response.status(500).send({ message: err });
            return;
          }

          user.roles = [role._id];
          user.save((err) => {
            if (err) {
              response.status(500).send({ message: err });
              return;
            }

            response.send({ message: "User was registered successfully!" });
          });
        });
      }
    });
  };
  Signin = async (request, response) => {
    User.findOne({
      username: request.body.username,
    })
      .populate("roles", "-__v")
      .exec((err, user) => {
        if (err) {
          response.status(500).send({ message: err });
          return;
        }

        if (!user) {
          return response.status(404).send({ message: "User Not found." });
        }

        var passwordIsValid = bcrypt.compareSync(
          request.body.password,
          user.password
        );

        if (!passwordIsValid) {
          return response.status(401).send({
            accessToken: null,
            message: "Invalid Password!",
          });
        }

        var token = jwt.sign({ id: user.id }, config.secret, {
          expiresIn: 86400, // 24 hours
        });

        var authorities = [];

        for (let i = 0; i < user.roles.length; i++) {
          authorities.push(user.roles[i].name);
        }
        response.status(200).send({
          id: user._id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      });
  };
}

module.exports = new LoginController();
