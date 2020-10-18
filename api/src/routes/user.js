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

server.post("/", (req, res, next) => {
    const { name, email, password, image, location_id, rol } = req.body;

    if (!name || !email || !password || !image || !location_id || !rol)
        return res.status(400).json({ message: "A parameter is missing" });

    User.create({
        name,
        email,
        password,
        image,
        location_id,
        rol,
    })
        .then((user) => {
            return res.status(200).json(user);
        })
        .catch(next);
});

server.put("/:id", (req, res, next) => {
    let { id } = req.params;
    let update = req.body;

    User.findOne({ where: { id } })
        .then((user) => {
            if (!user) return res.status(404).json({ message: "User doesnt exist" });

            user.update(update).then((userUpdate) => {
                return res.status(200).json(userUpdate);
            });
        })
        .catch(next);
});

server.delete("/:id", (req, res, next) => {
    let { id } = req.params;

    User.findOne({ where: { id } })
        .then((user) => {
            if (!user)
                return res.status(404).json({ message: "User doesnt exist" });

            user.destroy(user).then(() => {
                return res.status(200).json({ message: "User deleted" });
            });
        })
        .catch(next);
});

module.exports = server;
