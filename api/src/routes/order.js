const server = require("express").Router();
const { Order } = require("../db.js");

server.post("/", (req, res, next) => {
  const { id , status } = req.body;
console.log(req.body)
  if ( !id, !status)
    return res.status(400).json({ message: "incomplete order" });

  Order.create({
    order_id: id,
    order_status: status.values,
    // producto? de linea order
    //user_id viene de relacion
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
