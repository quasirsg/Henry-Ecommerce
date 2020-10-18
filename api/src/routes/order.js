const server = require("express").Router();
const { Linea_order } = require("../db.js");

server.post("/", (req, res, next) => {
  const { quantity, total, order_id, product_id, userId, status } = req.body;
  console.log(req.body);
  // if ((!id, !status))
  //   return res.status(400).json({ message: "incomplete order" });

  Linea_order.create({
    order_id: order_id,
    total: total,
    product_id: product_id,
    userId: userId,
    quantity: quantity,
    status: status,
  })
    .then((Linea_order) => {
      return res.status(200).json(Linea_order);
    })
    .catch(next);
});

server.get("/", (req, res, next) => {
  Linea_order.findAll()
    .then((Linea_order) => {
      if (Linea_order === null)
        return res.status(404).json({ message: "No hay ordenes" });

      return res.status(200).json({ Linea_order });
    })
    .catch(next);
});

server.put("/:id", (req, res, next) => {
  let { id } = req.params;
  let currentOrder = req.body;

  Linea_order.findOne({ where: { id } })
    .then((Linea_order) => {
      if (!Linea_order)
        return res.status(404).json({ message: "Esa orden no existe" });

      Linea_order.update(currentOrder).then((orderUpdate) => {
        return res.status(200).json({ orderUpdate });
      });
    })
    .catch(next);
});

server.delete("/:id", (req, res, next) => {
  let { id } = req.params;

  Linea_order.findOne({ where: { id } })
    .then((Linea_order) => {
      if (!Linea_order)
        return res.status(404).json({ message: "Esa orden no existe" });

      Linea_order.destroy(Linea_order).then(() => {
        return res.status(200).json({ message: "Order eliminada" });
      });
    })
    .catch(next);
});

module.exports = server;
