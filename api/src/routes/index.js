const { Router } = require("express");
// import all routers;

const productRouter = require("./product.js");
const categoryRouter = require("./category.js");
const searchRouter = require("./search.js");
const orderRouter = require("./order.js");
const userRouter = require("./user.js");
const orderlineRouter = require("./lineaOrder.js");


const router = Router();

router.use("/products", productRouter);
router.use("/category", categoryRouter);
router.use("/search", searchRouter);
router.use("/order", orderRouter);
router.use("/users", userRouter);
router.use("/orderline", orderlineRouter);

module.exports = router;
