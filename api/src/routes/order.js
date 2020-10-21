const server = require("express").Router();
const { Order, User, Product, Linea_Order } = require("../db.js");

//order por id
server.get("/:id", (req, res) => {
  Order.findByPk(req.params.id)
    .then((order) => {
      if (!order) {
        return res.send({ message: "Order not found" }).status(404);
      }
      res.send({ data: order });
    })
    .catch((err) => {
      return res.sendStatus(500);
    });
});

//Retorna todas las ordenes
//Retonar todas las ordenes por status ["shopping_cart", "created", "processing", "canceled", "completed"]
server.get("/", (req, res) => {
  const status = req.query.status;
  if (!status) {
    Order.findAll({
      include: [{ model: User }, { model: Product, through: Linea_Order }],
    })
      .then((orders) => {
        return res.send({ data: orders });
      })
      .catch(() => {
        return res.status(500);
      });
  } else {
    Order.findAll({
      where: {
        status: status,
      },
    })
      .then((orders) => {
        res.send({ data: orders });
      })
      .catch((err) => {
        return res.sendStatus(500);
      });
  }
});

server.delete("/:id", (req, res) => {
  const id = req.params.id;
  Order.findByPk(id)
    .then(async (order) => {
      if (!order) {
        return res.sendStatus(404);
      }
      await order.destroy();
      res.sendStatus(204);
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

server.put("/:id", (req, res) => {
  const id = req.params.id;
  const { status } = req.body;

  Order.findByPk(id)
    .then((order) => {
      if (!order) {
        return res.sendStatus(404);
      }
      order.status = status;
      order
        .save()
        .then(() => {
          return res.send({ data: order }).status(200);
        })
        .catch((err) => {
          return res.sendStatus(500);
        });
    })
    .catch((err) => {
      return res.sendStatus(500);
    });
});

// Crear orden del usuario
server.post("/:userId", (req, res) => {
  const userId = req.params.userId;
  const status = req.body.status;

  if (status === "shopping_cart") {
    Order.findOne({
      where: {
        userId: userId,
        status: "shopping_cart",
      },
    })
      .then((e) => {
        User.findByPk(userId)
          .then((user) => {
            if (!user) {
              return res.sendStatus(404);
            }
            Order.findOrCreate({ where: { status }, raw: true }).then(
              (order) => {
                user
                  .addOrder(order.dataValues)
                  .then(() =>
                    res.status(201).json({ message: "Carrito creado" })
                  );
              }
            );
          })
          .catch((err) => {
            return res.sendStatus(500);
          });
      })
      .catch((err) => {
        return res.sendStatus(500);
      });
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
  } else if (status === "completed") {
    Order.findOne({
      where: {
        userId: userId,
        status: "processing",
      },
    })
      .then((order) => {
        order.status = "completed";
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

// const server = require("express").Router();
// const { Linea_order } = require("../db.js");

// server.post("/", (req, res, next) => {
//   const { quantity, total, order_id, product_id, userId, status } = req.body;
//   console.log(req.body);
//   // if ((!id, !status))
//   //   return res.status(400).json({ message: "incomplete order" });

//   Linea_order.create({
//     order_id: order_id,
//     total: total,
//     product_id: product_id,
//     userId: userId,
//     quantity: quantity,
//     status: status,
//   })
//     .then((Linea_order) => {
//       return res.status(200).json(Linea_order);
//     })
//     .catch(next);
// });

// server.get("/", (req, res, next) => {
//   Linea_order.findAll()
//     .then((Linea_order) => {
//       if (Linea_order === null)
//         return res.status(404).json({ message: "No hay ordenes" });

//       return res.status(200).json({ Linea_order });
//     })
//     .catch(next);
// });

// server.put("/:id", (req, res, next) => {
//   let { id } = req.params;
//   let currentOrder = req.body;

//   Linea_order.findOne({ where: { id } })
//     .then((Linea_order) => {
//       if (!Linea_order)
//         return res.status(404).json({ message: "Esa orden no existe" });

//       Linea_order.update(currentOrder).then((orderUpdate) => {
//         return res.status(200).json({ orderUpdate });
//       });
//     })
//     .catch(next);
// });

// server.delete("/:id", (req, res, next) => {
//   let { id } = req.params;

//   Linea_order.findOne({ where: { id } })
//     .then((Linea_order) => {
//       if (!Linea_order)
//         return res.status(404).json({ message: "Esa orden no existe" });

//       Linea_order.destroy(Linea_order).then(() => {
//         return res.status(200).json({ message: "Order eliminada" });
//       });
//     })
//     .catch(next);
// });

// module.exports = server;
// >>>>>>> d06ff30595b2f7e7d93d7c50297d4e1997f3db2f
