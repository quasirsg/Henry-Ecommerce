const server = require('express').Router();
const { Order, User, Product, Orderline } = require('../db.js');

server.get('/:id', (req, res) => {

    Order.findByPk(req.params.id)
        .then(order => {
            if (!order) {
                return res.send({ errors: { messages: ['Orden no encontrada'], status: 404 } }).status(404);
            }
            res.send({ data: order });
        })
        .catch(err => {
            return res.sendStatus(500);
        })
});

// GET /orders esta ruta obtiene todas las ordenes
// GET /orders?status=tipo_status  Esta ruta puede recibir el query string status y deberá devolver sólo las ordenes con ese status."

server.get('/', (req, res) => {
    if (!req.query.status) {
        Order.findAll({ include: [{ model: User }, { model: Product, through: Orderline }] })
            .then(orders => {
                return res.send({ data: orders });
            })
            .catch(() => {
                return res.status(500)
            });
    } else {


        const query = req.query.status;
        const st = ["shopping_cart", "created", "processing", "canceled", "completed"];
        const inn = st.indexOf(query);
        if (inn === -1)
            return res.send({ errors: [{ message: 'Status inválido' }], status: 422 }).status(422);

        Order.findAll({
            where: {
                status: query
            }
        }).then((orders) => {
            res.send({ data: orders })
        }).catch(err => {
            return res.sendStatus(500);
        })
    }
})

server.delete('/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    Order.findByPk(id * 1).then(async order => {
        if (!order) return res.sendStatus(404);
        await order.destroy();
        res.sendStatus(204);
    }).catch((err) => {
        console.log(err);
        res.sendStatus(500);
    });
});

server.put('/:id', verifyToken, (req, res) => {
    const id = req.params.id;
    if (!Number.isInteger(id * 1)) {//multiplicar * 1 es muy IMPORTANTE (cositas de javascript xd)!
        return res.send({ errors: [{ message: 'La id de la orden no es valida.' }], status: 422 }).status(422);
    }

    const { status } = req.body


    Order.findByPk(id).then(order => {
        if (!order) {
            return res.send({ errors: [{ message: 'Orden no encontrada' }], status: 404 }).status(404);
        }
        order.status = status;
        order.save().then(() => {
            return res.send({ data: order }).status(200);
        }).catch(err => {
            var status = 500;
            if (err.name === 'SequelizeValidationError') status = 422;
            return res.send({ errors: err.errors, status }).status(status);
        });
    }).catch(err => {
        return res.sendStatus(500);
    });
});


/////****************** CREA ORDEN VACIA NUEVA PARA EL USUARIO SI NO EXISTE Y EL STATUS ES COMPLETADO O CANCELADO ************/
server.post('/:idUser', (req, res) => {

    const idUser = req.params.idUser;
    const status = req.body.status;


    if (status == "shopping_cart") {

        Order.findOne({
            where: {
                userId: idUser,
                status: "shopping_cart",
            }
        }).then((e) => {

            if (e && (e.dataValues.status == "shopping_cart")) {
                res.send("este usuario ya tiene un status shopping_cart");
                return;
            }

            User.findByPk(idUser).then((user) => {
                if (!user) {
                    res.send({ errors: { messages: ['Usuario no encontrado'], status: 404 } }).status(404);
                    return;
                }
                Order.create(() => {
                }).then((order) => {
                    user.addOrder(order).then(() => {
                        return res.sendStatus(201);
                    });
                })
            }).catch(err => {
                return res.sendStatus(500);
            });

        }).catch(err => {
            return res.sendStatus(500);
        });
    }

    else if (status == "created") {

        Order.findOne({
            where: {
                userId: idUser,
                status: "shopping_cart",
            }
        }).then((order) => {

            if (order) {
                order.status = "created"
                order.save().then((order) => {
                    res.send(order);
                    return;
                }).catch(err => {
                    return res.sendStatus(500);
                })
            } else {
                res.send("Error orden no encontrada");
                return;
            }

        }).catch(err => {
            return res.sendStatus(500);
        });
    }

    else if (status == "processing") {

        Order.findOne({
            where: {
                userId: idUser,
                status: "created",
            }
        }).then((order) => {

            if (order) {
                order.status = "processing"
                order.save().then((order) => {
                    res.send(order);
                    return;
                }).catch(err => {
                    return res.sendStatus(500);
                })
            } else {
                res.send("Error orden no encontrada");
                return;
            }
        }).catch(err => {
            return res.sendStatus(500);
        });
    }

    else if (status == "completed") {

        Order.findOne({
            where: {
                userId: idUser,
                status: "processing",
            }
        }).then((order) => {

            if (order) {
                order.status = "completed"
                order.save().then((order) => {
                    res.send(order);
                    return;
                }).catch(err => {
                    return res.sendStatus(500);
                })
            } else {
                res.send("Error orden no encontrada");
                return;
            }
        }).catch(err => {
            return res.sendStatus(500);
        });
    }
});

module.exports = server;