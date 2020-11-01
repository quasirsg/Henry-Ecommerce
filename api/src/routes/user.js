const server = require("express").Router();
const { User, Order, Product, Linea_order, Reviews } = require("../db.js");
const authorize = require("../helpers/auth");
const userService = require("../controllers/userController");

//Agregar un usuario
server.post("/", (req, res, next) => {
  const {
    name,
    email,
    address,
    phoneNumber,
    password,
    image,
    location_id,
  } = req.body;
  console.log(name);
  if (!name || !email || !address || !password || !image)
    return res.status(400).json({
      message: "A parameter is missing",
    });

  User.create({
    name,
    email,
    address,
    phoneNumber,
    password,
    image,
    location_id,
  })
    .then((user) => {
      return res.status(200).json(user);
    })
    .catch((error) => {
      console.log("h");
    });
});

//Actualizar un usuario
server.put("/:id", authorize(), (req, res, next) => {
  let { id } = req.params;
  let update = req.body;

  User.findOne({
    where: {
      id,
    },
  })
    .then((user) => {
      if (!user)
        return res.status(404).json({
          message: "User doesnt exist",
        });

      user.update(update).then((userUpdate) => {
        return res.status(200).json(userUpdate);
      });
    })
    .catch((error) => {
      console.log("h");
    });
});

//Eliminar un usuario
server.delete("/:id", (req, res, next) => {
  let { id } = req.params;

  User.findOne({
    where: {
      id,
    },
  })
    .then((user) => {
      if (!user)
        return res.status(404).json({
          message: "User doesnt exist",
        });

      user.destroy(user).then(() => {
        return res.status(200).json({
          message: "User deleted",
        });
      });
    })
    .catch(next);
});

server.put('/:id/passwordChange', (req, res) => {
  const id = req.params.id;
  const { email, currentPassword, newPassword } = req.body;
  console.log(newPassword);
  User.findOne({
    where: {
      email,
    }
  })
    .then(user => {
      bcrypt.compare(currentPassword, user.dataValues.password, (error, response) => {
        if (response) {
          bcrypt
            .hash(newPassword, 10)
            .then((hash) => {
              user.password = hash;
              user.save()
                .then(response => res.sendStatus(201));
            })
        } else {
          res.sendStatus(404);
        }
      })
    })
});

// Dar permisos de Admin a user
server.put("/:id/promote", (req, res, next) => {
  const { id } = req.params;
  const { role } = req.body;

  User.update(
    {
      role: role,
    },
    {
      where: { id },
    }
  )
    .then((user) => {
      return res.json({
        user,
      });
    })
    .catch((error) => next(error.message));
});

//obtener todos los usuarios
server.get("/", (req, res) => {
  User.findAll({
    order: [["id", "ASC"]],
    attributes: ["id", "name", "email", "address", "role", "phoneNumber"],
  })
    .then((users) => {
      return res.send({
        data: users,
      });
    })
    .catch((err) => {
      return res.sendStatus(500);
    });
});

//obtener todas las ordenes de un usuario en especifico
server.get("/order/cart/:id", (req, res, next) => {
  const id = req.params.id;

  User.findOne(
    {
      where: {
        id,
      },
    },
    {
      include: {
        model: Order,
        through: { attributes: ["total", "quantity"] },
      },
    }
  )
    .then((user) => {
      return res.status(200).json({ data: user.orders });
    })
    .catch((err) => {
      next(err.message);
    });
});

//obtener todas las ordenes de un usuario en especifico
server.get("/:id/orders", (req, res) => {
  const id = req.params.id;

  User.findByPk(id, {
    include: {
      model: Order,
      through: {
        attributes: ["total", "quantity"],
      },
    },
  })
    .then((user) => {
      return res
        .send({
          data: user.orders,
        })
        .status(200);
    })
    .catch((err) => {
      return res.sendStatus(500);
    });
});

//obtener todas las ordenes de todos los usuario
server.get("/orders", (req, res) => {
  const userId = req.userId;
  Order.findAll({
    include: [
      User,
      {
        model: Product,
        through: Linea_order,
      },
    ],
    where: {
      userId: userId,
      status: {
        [Op.ne]: "shopping_cart",
      },
    },
  })
    .then((orders) => {
      return res.send({
        data: orders,
      });
    })
    .catch((err) => {
      return res.sendStatus(500);
    });
});

//agregar un producto al carrito
server.post("/:userId/cart/add", async (req, res, next) => {
  const { userId } = req.params;
  const { productId, quantity, orderId } = req.body;

  try {
    const { stock, price, id, name, image } = await Product.findOne({
      where: {
        id: productId,
      },
      raw: true,
    });

    // Verificar stock
    if (quantity > stock) {
      return res.status(400).json({ message: "Invalid Operation" });
    }

    const subTotal = price * quantity;

    // Agregar al carrito
    await Linea_order.findOrCreate({
      where: {
        quantity: quantity,
        total: subTotal,
        product_id: id,
        orderId: orderId,
        userId: userId,
      },
    });

    const product = {
      id,
      name,
      image,
      price,
      stock,
      quantity,
      total: subTotal,
    };

    return res.status(201).json({
      message: "Se agrego al carrito.",
      product,
    });
  } catch (error) {
    next(error.message);
  }
});

// Agregar los productos del carrito guest al carrito del user
server.post("/:userId/cart", async (req, res, next) => {
  const { productsCarts, orderId } = req.body;
  const { userId } = req.params;

  try {
    productsCarts.forEach(async (product) => {
      const { stock, id: idProduct } = await Product.findOne({
        where: {
          id: product.id,
        },
        raw: true,
      });

      // Verificar stock
      if (product.quantity > stock) {
        return res.status(400).json({ message: "Invalid Operation" });
      }

      // Agregar total
      product.total = product.price * product.quantity;

      // Agregar al carrito
      await Linea_order.findOrCreate({
        where: {
          quantity: product.quantity,
          total: product.total,
          product_id: idProduct,
          orderId: orderId,
          userId: userId,
        },
      });
    });

    return res.json({
      message: "Se agregaron los productos",
      productsCarts,
    });
  } catch (error) {
    next(error.message);
  }
});

//modificamos la cantidad de un producto en especifico, que se encuentre en el carrito
server.put("/:userId/cart/:productId", async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;
  const quantity = req.body.quantity;
  const amount = req.body.amount;

  let product = await Product.findByPk(productId);

  if (product.stock < quantity) return res.sendStatus(422);

  Linea_order.findOne({
    //??orderline??
    include: [{ model: Order }],
    where: {
      userId: userId,
      product_id: productId,
      "$order.status$": "shopping_cart",
    },
  })
    .then(async (orderline) => {
      if (!orderline) return res.sendStatus(404);
      if (amount === "addAmount") {
        if (quantity < product.stock) {
          orderline.quantity += 1;
          orderline.total = orderline.quantity * product.price;
        }
      } else if (amount === "deleteAmount") {
        if (quantity > 1) {
          orderline.quantity -= 1;
          orderline.total = orderline.total - product.price;
        } else if (quantity === 0) {
          orderline.quantity = quantity;
        }
      }
      await orderline.save();
      return res.json({
        data: orderline,
      });
    })
    .catch((err) => {
      console.log(err);
      return res.sendStatus(500);
    });
});

//Eliminar un producto del carrito de un usuario en especifico
server.delete("/:userId/cart/:productId", (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;

  Linea_order.findOne({
    include: [
      {
        model: Order,
      },
    ],
    where: {
      "$order.userId$": userId,
      "$order.status$": "shopping_cart",
      product_id: productId,
    },
  })
    .then(async (orderline) => {
      if (!orderline) {
        return res.sendStatus(404);
      }

      await orderline.destroy();

      let _orderline = await Linea_order.findOne({
        where: {
          orderId: orderline.orderId,
        },
      });
      if (!_orderline)
        await Order.destroy({
          where: {
            id: orderline.orderId,
          },
        });

      return res.sendStatus(204);
    })
    .catch((error) => {
      return res.status(500).json({
        error: error.message,
      });
    });
});

//vacia el carrito
server.delete("/:userId/cart", (req, res) => {
  const userId = req.params.userId;
  console.log(userId);
  Order.findOne({
    where: {
      userId: userId,
      status: "shopping_cart",
    },
  })
    .then(async (order) => {
      if (!order) return res.sendStatus(404);
      await order.destroy();
      return res.sendStatus(204);
    })
    .catch((err) => {
      return res.sendStatus(500);
    });
});

//obtener el carrito del usuario
server.get("/:userId/cart", (req, res) => {
  //revisar con linea 178
  const userId = req.params.userId;

  Order.findOne({
    include: [User, { model: Product, through: Linea_order }],
    where: {
      userId: userId,
      status: "shopping_cart",
    },
  })
    .then((order) => {
      if (!order) {
        return res.sendStatus(404);
      }
      return res.send({
        data: order,
      });
    })
    .catch((err) => {
      return res.sendStatus(500);
    });
});

server.get("/:userId/ordersall", (req, res) => {
  const userId = req.params.userId;

  Order.findAll({
    include: [User, { model: Product }],
    where: {
      userId,
    },
  })
    .then((order) => {
      if (!order) {
        return res.sendStatus(404);
      }
      return res.send({
        data: order,
      });
    })
    .catch((err) => {
      return res.sendStatus(500);
    });
});
//ruta que retorna todas las reviews de un usuario
server.get("/:id/reviews", (req, res) => {
  const userId = req.params.id;

  Reviews.findAll({
    include: [{ model: User, attributes: ["name", "image"] }],
    where: { userId },
  })
    .then((reviews) => res.status(200).json({ data: reviews }))
    .catch((err) => console.log(err));
});

//AUTH
//Login de un usuario
server.post("/login", userService.login);
//obtener "mis" detalles de usuario por id (client)
server.get("/me", authorize(), userService.getByMyId);
//obtener detalles de usuario por id (admin)
server.get("/:id", authorize(), userService.getById);
//}

module.exports = server;
