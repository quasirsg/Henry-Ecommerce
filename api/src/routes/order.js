const server = require("express").Router();
const { Order, User, Product, Linea_order } = require("../db.js");

server.post("/", (req, res, next) => {
  const { id, status, user_id } = req.body;
  if ((!id, !status))
    return res.status(400).json({ message: "incomplete order" });

  Order.create({
    order_id: id,
    order_status: status,
    userId: user_id,
  })
    .then((order) => {
      return res.status(200).json(order);
    })
    .catch(next);
});

//trae todas las ordenes de todos los usuarios
server.get("/", (req, res, next) => {
  Order.findAll()
    .then((order) => {
      if (order === null)
        return res.status(404).json({ message: "No hay ordenes" });

      return res.status(200).json({ order });
    })
    .catch(next);
});

//??Get order by orderId

server.get("/:orderId", (req, res, next) => {
  const { orderId } = req.params;

  Order.findAll({
    attributes: ["id", "status", "userId"],
    where: {
      id: orderId,
    },
    include: {
      attributes: ["name", "price", "image", "id"],
      model: Product,
      through: {
        attributes: ["id", "quantity", "total"],
      },
    },
  })
    .then((order) => res.json(order))
    .catch((error) => next(error.message));
});

//Actualiza orden por id
server.put("/:id", (req, res, next) => {
  let { id } = req.params;
  let currentOrder = req.body;

  console.log(currentOrder);

  Order.findOne({
    where: { id },
    include: {
      attributes: ["name", "price", "image", "id"],
      model: Product,
      through: {
        attributes: ["id", "quantity", "total"],
      },
    },
  })
    .then((order) => {
      if (!order)
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

server.post("/:userId", (req, res, next) => {
  let { userId } = req.params;
  let { status } = req.body;

  if (status === "shopping_cart") {
    try {
      User.findByPk(userId)
        .then((user) => {
          if (!user) {
            return res.sendStatus(404);
          }
          Order.findOrCreate({ where: { status, userId }, raw: true }).then(
            (order) => {
              const numOrder = order[0].dataValues
                ? order[0].dataValues.id
                : order[0].id;
              user.addOrder(numOrder).then(() => {
                return res.status(201).json({ orderId: numOrder });
              });
            }
          );
        })
        .catch((err) => {
          return res.sendStatus(500);
        });
    } catch (error) {
      next(error.message);
    }
  } else if (status === "created") {
    Order.findOne({
      where: {
        userId: userId,
        status: "shopping_cart",
      },
    })
      .then((order) => {
        order.status = "created";
        order
          .save()
          .then((order) => {
            return res.send(order);
          })
          .catch((err) => {
            return res.sendStatus(500);
          });
      })
      .catch((err) => {
        return res.sendStatus(500);
      });
  } else if (status === "processing") {
    Order.findOne({
      where: {
        userId: userId,
        status: "created",
      },
    })
      .then((order) => {
        order.status = "processing";
        order
          .save()
          .then((order) => {
            return res.send(order);
          })
          .catch((err) => {
            return res.sendStatus(500);
          });
      })
      .catch((err) => {
        return res.sendStatus(500);
      });
  }
});

module.exports = server;
