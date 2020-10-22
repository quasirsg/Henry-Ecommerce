const server = require("express").Router();
const { Order, Product } = require("../db.js");

server.get("/:orderId", (req, res, next) => {
  const { orderId } = req.params;

  Order.findAll({
    attributes: ["id", "status"],
    include: {
      attributes: ["name", "price", "image", "id"],
      model: Product,
      through: {
        attributes: ["id", "quantity", "total"],
        where: {
          orderId,
        },
      },
    },
  })
    .then((order) => res.json(order))
    .catch((error) => next(error.message));
});

module.exports = server;
