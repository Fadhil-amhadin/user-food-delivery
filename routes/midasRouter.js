const express = require("express");
const midasRouter = express.Router();
const authorization = require("../middlewares/authorization");
const uploadFile = require("../middlewares/uploadFile");

const UserController = require("../controllers/userController");

midasRouter.post("/signup/v1/foodDelivery/signup", UserController.register);
midasRouter.post("/login/v1/foodDelivery/login", UserController.login);
midasRouter.get("/login/v1/foodDelivery/loginCheck/:id", UserController.loginCheck);
midasRouter.put("/update/v1/foodDelivery/userUpdate", authorization, uploadFile("image") ,UserController.updateUser);


module.exports = midasRouter;
