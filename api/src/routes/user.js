const server = require("express").Router();
const { User, Order, Product, Linea_Order } = require("../db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var config = require("../configs/config");
var { authenticateToken } = require("../middlewares/middleware");
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
server.put("/:id", (req, res, next) => {
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

//obtener detalles de usuario por id//??nuevo
server.get("/:id", (req, res) => {
  const id = req.params.id;
  User.findByPk(id).then((user) => {
    return res.status(200).json(user);
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
        through: Linea_Order,
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
    const line_order = await Linea_order.findOrCreate({
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

//modificamos la cantidad de un producto en especifico, que se encuentre en el carrito
server.put("/:userId/cart/:productId", async (req, res) => {
  const userId = req.params.userId;
  const productId = req.params.productId;
  const quantity = req.body.quantity;

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

      orderline.quantity = quantity;
      await orderline.save();
      return res.send({
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

//Login de un usuario
server.post("/login", (req, res) => {
  var email = req.body.email.toLowerCase();
  var password = req.body.password;
  var tokenData = {
    email: email,
    // ANY DATA
  };
  User.findOne({
    attributes: [
      "id",
      "name",
      "password",
      "email",
      "address",
      "role",
      "phoneNumber",
    ],
    where: {
      email: email,
    },
  })
    .then((user) => {
      console.log();
      bcrypt.compare(password, user.dataValues.password, (err, response) => {
        if (err) {
          console.log("error");
        }
        if (response) {
          var token = jwt.sign(tokenData, config.llave, {
            expiresIn: 60 * 60 * 24, // expires in 24 hours
          });
          return res.status(200).send({
            token,
            user: user,
          });
        } else {
          return res.status(404).send({
            error: "contraseña Erronea",
          });
        }
      });
    })
    .catch((err) => {
      return res.status(404).send({
        error: "Email invalido",
      });
    });
});

//Ruta de prueba con middleware
server.get("/secure", authenticateToken, (req, res) => {
  return res.status(200).send({
    message: "Paso la verificación!!!!"
  });
});

module.exports = server;
