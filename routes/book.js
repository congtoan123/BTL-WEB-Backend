const express = require('express');
const router = express.Router();
const { authJwt } = require("../middleware");

const BookController = require('../controller/BookController');

router.get('/:id',[authJwt.verifyToken],BookController.getone);
//router.get('/:slug',[authJwt.verifyToken],BookController.show);
router.get('/', BookController.index);
router.post('/create',[authJwt.verifyToken,authJwt.isAdmin],BookController.create);
router.put('/update/:id',[authJwt.verifyToken,authJwt.isAdmin],BookController.update);
router.delete('/delete/:id',BookController.delete);

module.exports = router;