const express=require('express')
const {addItem,fetchCart,updateItem,removeItem}=require('../controllers/cartController')
const protect=require('../middlewares/authMiddleware')

const router=express.Router()

router.post('/',protect,addItem)
router.get('/',protect,fetchCart)
router.put('/',protect,updateItem)
router.delete('/',protect,removeItem)

module.exports=router