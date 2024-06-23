const express=require('express');

Routers=express.Router();

const  ValidationController = require("../controllers/Validationcontroller");

Routers.get('/Login',ValidationController.userLogin);

Routers.post('/Register',ValidationController.userRegister);

Routers.post('/ForgotPassword',ValidationController.userForgotPassword);

Routers.put('/UpdatingPassword',ValidationController.userUpdatdePassword);

Routers.get('/Success',ValidationController.Success);

module.exports=Routers;