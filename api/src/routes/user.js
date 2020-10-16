const server = require("express").Router();
const { User, Order, Product, Linea_Order } = require("../db.js");

server.get("/", (req, res) => {
    User.findAll({
        order: [["id", "ASC"]],
        attributes: [
            "id",
            "name",
            "email",
            "address",
            "role",
            "phoneNumber",
        ],
    })
        .then((users) => {
            return res.send({ data: users });
        })
        .catch((err) => {
            return res.sendStatus(500);
        });
});

server.post("/", async (req, res) => {
    const {
        name,
        email,
        address,
        role,
        phoneNumber,
        password,
    } = req.body;
    //falta encriptar la contraseña
    User.create({
        name,
        email,
        address,
        role,
        phoneNumber,
        password: password
    })
        .then((user) => {
            return res.send({ data: user }).status(201);
        })
        .catch((err) => {
            return res.sendStatus(500);
        });
});

server.get("/:id/orders", (req, res) => {
    const id = req.params.id;

    User.findByPk(id, {
        include: {
            model: Order,
            through: { attributes: ["total", "quantity"] },
        },
    })
        .then((user) => {
            return res.send({ data: user.orders }).status(200);
        })
        .catch((err) => {
            return res.sendStatus(500);
        });
});

server.put("/:id", (req, res) => {
    const id = req.params.id;
    const {
        name,
        email,
        address,
        role,
        phoneNumber,
        password
    } = req.body;

    User.findByPk(id)
        .then((user) => {
            if (!user) {
                return res.sendStatus(404);
            }
            let emailIsChanged = user.email !== email ? true : false;
            if (emailIsChanged) {
                user.email = email;
            }
            user.name = name;
            if (password) {
                user.password = password;
            }
            user.role = role;
            user.address = address;
            user.phoneNumber = phoneNumber;
            user.save()
                .then(() => {
                    return res.sendStatus(201);
                })
                .catch((err) => {
                    return res.sendStatus(500);
                });
        })
        .catch((err) => {
            return res.sendStatus(500);
        });
});

server.post("/userId/cart", (req, res) => {
    const userId = req.params.userId;
    const { productId, quantity } = req.body;

    Order.findOne({
        where: {
            userId: userId,
            status: "shopping_cart",
        },
    })
        .then((order) => {
            const orderId = order.id;

            Product.findOne({
                where: {
                    id: productId,
                },
            })
                .then((product) => {
                    if (quantity > product.stock) {
                        return res.send("Invalid Operation");
                    }
                    Linea_Order.create({
                        quantity: quantity,
                        total: product.price,
                        productId: productId,
                        orderId: orderId,
                        userId: userId,
                    })
                        .then((orderCreated) => {
                            return res.send(orderCreated).sendStatus(201);
                        })
                        .catch((err) => {
                            return res.sendStatus(500);
                        });
                });
        });
});

server.get("/orders", (req, res) => {
    const userId = req.userId;
    Order.findAll({
        include: [User, { model: Product, through: Linea_Order }],
        where: {
            userId: userId,
            status: {
                [Op.ne]: "shopping_cart",
            },
        },
    })
        .then((orders) => {
            return res.send({ data: orders });
        })
        .catch((err) => {
            return res.sendStatus(500);
        });
});

module.exports = server;