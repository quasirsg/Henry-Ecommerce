const { Router } = require("express");
// import all routers;

const productRouter = require("./product.js");
const categoryRouter = require("./category.js");
const searchRouter = require("./search.js");
const orderRouter = require("./cart.js");
const userRouter = require('./user.js');



const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);


router.use("/products", productRouter);
router.use("/category", categoryRouter);
router.use("/search", searchRouter);
router.use("/order", orderRouter);
router.use('/users', userRouter);


module.exports = router;
