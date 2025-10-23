const express=require('express')
const {registerUser,validateUser,loginUser,listUsers}=require('../controllers/userController')
const router=express.Router()
const protect=require('../middlewares/authMiddleware')

router.post('/register',validateUser,registerUser)
router.post('/login',loginUser)
router.get("/",protect,listUsers);
module.exports=router