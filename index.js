const express = require("express");
const Data = require("./data/db.js");

const server = express();
const port = 8000;

server.use(express.json());

// GET REQUEST ("/")
server.get("/api/users", (req, res) => {
  Data.find()
    .then((data) => res.status(200).json(data))
    .catch(() =>
      res.status(500).json({
        errorMessage: "Sorry, we ran into an error when getting the data."
      })
    );
});

server.listen(port, () => console.log(`\n *** API ON PORT: ${port} *** \n`));
