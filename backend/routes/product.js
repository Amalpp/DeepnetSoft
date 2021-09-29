const express = require('express')
const router = express.Router()
const {newProduct, list,removeProduct,searchProduct,productById,update,singleProduct} = require('../controllers/product')

router.post('/create/product',newProduct)
router.get('/viewProduct',list)
router.get('/getProduct/:productId',singleProduct)
router.get('/search',searchProduct)
router.delete('/product/:productId',removeProduct)
router.put("/product/:productId",update);

router.param("productId", productById);


module.exports = router