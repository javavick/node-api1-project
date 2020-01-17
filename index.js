const express = require("express");
const Data = require("./data/db.js");

const server = express();
const port = 8000;

server.use(express.json());

// GET REQUEST ("/api/users")
server.get("/api/users", (req, res) => {
  Data.find()
    .then((data) => res.status(200).json(data))
    .catch(() =>
      res.status(500).json({
        errorMessage: "The users information could not be retrieved."
      })
    );
});

// GET REQUEST ("/api/users/:id")
server.get(`/api/users/:id`, (req, res) => {
  Data.findById(req.params.id)
    .then((data) => {
      if (!data) {
        res.status(404).json({
          errorMessage: "The user with the specified ID does not exist."
        });
      } else {
        res.status(200).json(data);
      }
    })
    .catch(() =>
      res.status(500).json({
        errorMessage: "The user information could not be retrieved."
      })
    );
});

// POST REQUEST ("/api/users")
server.post("/api/users", (req, res) => {
  Data.insert(req.body)
    .then((data) => {
      if (!req.body.name || !req.body.bio) {
        res
          .status(400)
          .json({ errorMessage: "Please provide name and bio for the user" });
      } else {
        Data.findById(data.id)
          .then((data) => res.status(201).json(data))
          .catch(() =>
            res.status(500).json({
              errorMessage: "The users information could not be retrieved."
            })
          );
      }
    })
    .catch(() => {
      res.status(500).json({
        errorMessage: "There was an error while saving the user to the database"
      });
    });
});

server.listen(port, () => console.log(`\n *** API ON PORT: ${port} *** \n`));
