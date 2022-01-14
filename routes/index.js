const express = require("express");
const router = express.Router();

const midasRouter = require("./midasRouter");
const errorHandler = require("../middlewares/errorHandler");

router.use("/midas", midasRouter);

router.use(errorHandler);

module.exports = router;
