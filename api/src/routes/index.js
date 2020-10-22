const { Router } = require("express");
// import all routers;

const productRouter = require("./product.js");
const categoryRouter = require("./category.js");
const searchRouter = require("./search.js");
const orderRouter = require("./order.js");
const userRouter = require("./user.js");

const router = Router();

router.use("/products", productRouter);
router.use("/category", categoryRouter);
router.use("/search", searchRouter);
router.use("/order", orderRouter);
router.use("/users", userRouter);
router.get('/', function(req, res) {
    res.send('Inicio');
});
router.post('/autenticar', (req, res) => {
    if(req.body.usuario === "asfo" && req.body.contrasena === "holamundo") {
  const payload = {
   check:  true
  };
  const token = jwt.sign(payload, app.get('llave'), {
   expiresIn: 1440
  });
  res.json({
   mensaje: 'Autenticación correcta',
   token: token
  });
    } else {
        res.json({ mensaje: "Usuario o contraseña incorrectos"})
    }
})
module.exports = router;
