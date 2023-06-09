const express = require('express');
const router = express.Router();
const { authJwt } = require("../middleware");

const CommentController = require("../controller/CommentController")

router.post('/upload/:id',[authJwt.verifyToken],CommentController.uploadcomment);
router.get('/:id',[authJwt.verifyToken],CommentController.getBookcomment);



module.exports = router;