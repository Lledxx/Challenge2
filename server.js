import express from "express";

const server = express();
const PORT = 8080;

const ready = () => console.log("Server ready on port " + PORT);

const path = "/";

const functionRead = (req, res) => {
  res.status(200).send("My first Express server");
};

server.get(path, functionRead);

server.listen(PORT, ready);