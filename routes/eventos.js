const express = require('express');
const router = express.Router();
const productController  = require('../controllers/eventosController')

router.get('/produtos', productController.getProdutos());


router.post('/', (req, res) => {

});

module.exports = router;
