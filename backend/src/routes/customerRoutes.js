const express=require('express')
const router=express.Router()
const {
  registerCustomer,
  validateCustomer,
  loginCustomer,
} = require("../controllers/customerController");


router.post('/register',validateCustomer,registerCustomer)
router.post('/login',loginCustomer)
module.exports=router