const path = require("path");
const express = require("express");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const route = require("./routes");
const db = require("./config/db.config");
const Role = require("./models/Roles");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
// Connect to DB
db.connect();

const app = express();
const port = 5000;
var corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
};
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
// Use static folder
app.use(express.static(path.join(__dirname, "public")));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride("_method"));
// HTTP logger
// app.use(morgan('combined'));
function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'user' to roles collection");
      });
      new Role({
        name: "moderator",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'moderator' to roles collection");
      });
      new Role({
        name: "admin",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }
        console.log("added 'admin' to roles collection");
      });
    }
  });
}
function init(){
  User.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {  
      Role.findOne({name:"admin"},(err,roles)=>{
        const user = new User({
          username: "admin",
          password:  bcrypt.hashSync("123456", 8),
          roles : [roles._id]
        });
        user.save((err) => {
          if (err) {
            console.log("error", err);
          }
          console.log("added admin account password 123456 ");
        });
      })
    }
  });
}

initial();
setTimeout(() => {
  
  init()
}, 300);
// Routes init
route(app);

app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
