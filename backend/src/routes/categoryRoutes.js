const express=require('express')
const {addCategory,fetchCategories,fetchCategoryById}=require('../controllers/categoryController')
const protect=require('../middlewares/authMiddleware')

const router=express.Router()

router.post('/',protect,addCategory)
router.get('/',fetchCategories)
router.get('/:id',fetchCategoryById)

module.exports=router