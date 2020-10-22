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

//   router.get('/secure', (req, res) => {
//     var token = req.headers['authorization']
//     if(!token){
//         res.status(401).send({
//           error: "Es necesario el token de autenticación"
//         })
//         return
//     }

//     token = token.replace('Bearer ', '')

//     jwt.verify(token, 'Secret Password', function(err, user) {
//       if (err) {
//         res.status(401).send({
//           error: 'Token inválido'
//         })
//       } else {
//         res.send({
//           message: 'Awwwww yeah!!!!'
//         })
//       }
//     })
// })

module.exports = router;
