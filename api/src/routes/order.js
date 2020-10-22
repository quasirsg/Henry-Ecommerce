const server = require("express").Router();
const { Order } = require("../db.js");

// server.post("/", (req, res, next) => {
//   const { id , status, user_id } = req.body;
// console.log(req.body)
//   if ( !id, !status)
//     return res.status(400).json({ message: "incomplete order" });

//   Order.create({
//     order_id: id,
//     order_status: status,
//     userId: user_id
//   })
//     .then((order) => {
//       return res.status(200).json(order);
//     })
//     .catch(next);
// });

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

<<<<<<< HEAD
  Order.findOne({ where: { id } })
    .then((order) => {
      if (!order)
        return res.status(404).json({ message: "Esa orden no existe" });

      order.destroy(order).then(() => {
        return res.status(200).json({ message: "Order eliminada" });
=======
  if (status === "shopping_cart") {

    try {
      User.findByPk(userId)
        .then((user) => {
          if (!user) {
            return res.sendStatus(404);
          }
          Order.findOrCreate({ where: { status }, raw: true })
            .then((order) => {
              const numOrder = order[0].dataValues ? order[0].dataValues.id : order[0].id;
              user.addOrder(numOrder)
                .then(() => {
                  return res.status(201).json({ orderId: numOrder })
                })
            });
        })
        .catch((err) => {
          return res.sendStatus(500);
        });
    } catch (error) {
      console.log(error.message);
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
>>>>>>> a7720e3d6df4cfd13d4419fd519445efd33bb213
      });
    })
    .catch(next);
});

module.exports = server;
