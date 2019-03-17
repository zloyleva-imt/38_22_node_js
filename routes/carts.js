const express = require('express');
const router = express.Router();
const cartsController = require('../controllers/cartsController');

router.get('/:userId', cartsController.cart_show);
router.post('/', cartsController.cart_add_item);

module.exports = router;