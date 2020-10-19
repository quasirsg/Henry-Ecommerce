const server = require("express").Router();
const { Order } = require("../db.js");

server.get("/", (req, res, next) => {
  Order.findAll()
    .then((order) => {
      if (order === null)
        return res.status(404).json({ message: "No hay ordenes" });

      return res.status(200).json({ order });
    })
    .catch(next);
});
