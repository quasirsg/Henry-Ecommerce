const express = require('express');
const router = express.Router();
const { User } = require('../db.js');

router.get('/:id', (req, res) => {
    const { id } = req.params;

    User.findByPk(id)
        .then(user => {
            if (!user) {
                res.status(404).send('Usuario no registrado!');
            } else {
                res.send(user);
            }
        });
});

router.post('/create', (req, res) => {
    //Validacion basica
    const { name, email, password } = req.body;
    if (!name && !email && !password) {
        return res.status(400).send('Error!');
    } else {
        User.create(req.body)
            .then(res => {
                return res.status(201).send(res);
            })
            .catch(() => {
                return res.status(400).send('No se pudo crear el usuario');
            });
    }
});

router.delete('/:id', (req, res) => {
    let { id } = req.params;

    User.destroy({ where: { id } })
        .then(res => {
            res.sendStatus(200);
        });
});

router.get('/:userId/cart', (req, res) => {
    const { userId } = req.params;
});

router.post('/:userId/cart', async (req, res) => {
    const { userId } = req.params;

    const {
        status,
        recipient_name,
        recipient_lastname,
        country,
        city,
        address,
        postal_code,
        phone_number,
        shipping_type
    } = req.body;

    const userHasCart = await Purchase_order.findOne({
        where: { buyerId: userId, status: 'enCarrito' }
    });

    if (userHasCart) return res.status(400).send('El usuario todavía tiene un carrito abierto');

    Purchase_order.create(
        {
            buyerId: userId,
            status,
            recipient_name,
            recipient_lastname,
            country,
            city,
            address,
            postal_code,
            phone_number,
            shipping_type
        },
        { include: [{ model: User, as: 'buyer' }] }
    )
        .then(response => {
            response.products = [];
            response.orderlines = [];
            return response;
        })
        .then(villada => {
            return res.send(villada);
        })
        .catch(err => res.status(400).send('Algo salió mal: ' + err.message));
});

router.put('/:userId/cart', async (req, res) => {
    const { userId } = req.params;
    const { productId, quantity, price } = req.body;

    // Guard clauses
    if (!req.isAuthenticated()) return res.status(401).send('No estás logueado');
    if (req.user.id !== Number(userId) && req.user.rol !== 'Admin') {
        return res.status(401).send('No puedes editar el carrito de otra persona');
    }

    if (!productId) {
        return res.status(400).send('Debes indicar el producto a editar');
    }

    const order = await Purchase_order.findOne({
        where: { buyerId: userId, status: 'enCarrito' },
        include: Orderline
    });

    if (!order) return res.status(400).send('No se encontró el carrito del usuario');

    try {
        const [currentOrder, created] = await Orderline.findOrCreate({
            where: { productId, purchaseOrderId: order.id },
            defaults: { quantity, price }
        });

        if (!created) {
            if (quantity === 0) currentOrder.destroy();
            else {
                currentOrder.quantity = quantity || currentOrder.quantity;
                currentOrder.price = price || currentOrder.price;

                await currentOrder.save();
                await currentOrder.reload();
            }
        }

        await order.save();
        await order.reload();

        return res.send(order);
    } catch (error) {
        return res.status(405).send('Algo salió mal: ' + error.message);
    }
});

router.delete('/:userId/cart', (req, res) => {
    const { userId } = req.params;

    // Guard clauses
    if (!req.isAuthenticated()) return res.status(401).send('No estás logueado');
    if (req.user.id !== Number(userId) && req.user.rol !== 'Admin') {
        return res.status(401).send('No puedes borrar el carrito de otra persona');
    }

    Purchase_order.destroy({ where: { buyerId: userId, status: 'enCarrito' } })
        .then(response => {
            if (!response) return res.status(404).send('No se encontró el carrito');
            else return res.send('Carrito eliminado con éxito');
        })
        .catch(err => res.status(400).send('Algo salió mal: ' + err.message));
});

module.exports = router;