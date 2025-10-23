const express=require('express')
const {addBrand,fetchBrands,fetchBrandById}=require('../controllers/brandController')
const protect=require('../middlewares/authMiddleware')

const router=express.Router()

router.post('/',protect,addBrand)
router.get('/',fetchBrands)
router.get('/:id',fetchBrandById)
module.exports=router