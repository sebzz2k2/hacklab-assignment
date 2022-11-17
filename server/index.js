//! import required modules
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

//! reading the data from the json file
const users = fs.readFileSync("user.json");
let usersData = JSON.parse(users);

//! test route
app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

//! post route
app.post("/", (req, res) => {
  const { username, lattitude, longitude } = req.body;
  const newUser = {
    username,
    location: {
      lattitude,
      longitude,
    },
  };
  // ! add new user to the users array
  usersData.users.push(newUser);
  // ! write the new data to the json file
  fs.writeFileSync("user.json", JSON.stringify(usersData, null, 2), (err) => {
    if (err) throw err;
  });
  res.json({ status: "ok" });
});

//! to access the port number from the environment variable
const PORT = process.env.PORT || 5000;

//! start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
