const express=require('express')
const {addProduct,fetchProducts,fetchProductById}=require('../controllers/productController')
const protect=require('../middlewares/authMiddleware')
// const upload=require('../middlewares/uploadMiddleware')

const router=express.Router()

router.post('/',protect,addProduct)
router.get('/',fetchProducts)
router.get('/:id',fetchProductById)

module.exports=router