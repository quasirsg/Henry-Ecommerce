const server = require("express").Router();
const { Order } = require("../db.js");

server.post("/", (req, res, next) => {
  const { order_total, order_state, order_date } = req.body;

  if (!order_total || !order_state || !order_date)
    return res.status(400).json({ message: "incomplete order" });

  Order.create({
    order_total: order_total,
    order_state: order_state,
    order_date: order_date,
  })
    .then((order) => {
      return res.status(200).json(order);
    })
    .catch(next);
});

server.get("/", (req, res, next) => {
  Order.findAll()
    .then((order) => {
      if (order === null)
        return res.status(404).json({ message: "No hay ordenes" });

      return res.status(200).json({ order });
    })
    .catch(next);
});

server.put("/:id", (req, res, next) => {
  let { id } = req.params;
  let currentOrder = req.body;

  Order.findOne({ where: { id } })
    .then((order) => {
      if (!orden)
        return res.status(404).json({ message: "Esa orden no existe" });

      order.update(currentOrder).then((orderUpdate) => {
        return res.status(200).json({ orderUpdate });
      });
    })
    .catch(next);
});

server.delete("/:id", (req, res, next) => {
  let { id } = req.params;

  Order.findOne({ where: { id } })
    .then((order) => {
      if (!order)
        return res.status(404).json({ message: "Esa orden no existe" });

      order.destroy(order).then(() => {
        return res.status(200).json({ message: "Order eliminada" });
      });
    })
    .catch(next);
});

module.exports = server;
