const express = require('express');
const router = express.Router();
const { authJwt } = require("../middleware");

const OrderController = require("../controller/OrderController")

router.post('/newOrder',[authJwt.verifyToken],OrderController.AddOrder);
router.get('/:username',[authJwt.verifyToken],OrderController.getOrder);
router.delete('/:id',[authJwt.verifyToken],OrderController.DeleteOrder)


module.exports = router;