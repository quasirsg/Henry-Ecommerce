const { Router } = require("express");
// import all routers;

const productRouter = require("./product.js");
const categoryRouter = require("./category.js");
const searchRouter = require("./search.js");
const orderRouter = require("./order.js");
const userRouter = require("./user.js");
const router = Router();

// load each router on a route
// i.e: router.use('/auth', authRouter);
// router.use('/auth', authRouter);


router.use("/products", productRouter);
router.use("/category", categoryRouter);
router.use("/search", searchRouter);
router.use("/order", orderRouter);
<<<<<<< HEAD
router.use("/user", userRouter);
=======
router.use('/users', userRouter);

>>>>>>> d3a68ad581cbb5b091077af2369ba639355c66ed
module.exports = router;
