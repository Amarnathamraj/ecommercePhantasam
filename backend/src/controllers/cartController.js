const {addToCart,getCartByCustomer,updateCartItem,removeCartItem}=require('../models/cartModel')

const addItem=async(req,res,next)=>{
    try{
const {product_id,quantity,price_snapshot}=req.body
const customer_id=req.user.id;
if(!product_id||!quantity){
    return res.status(400).json({message:'required fields missing'})
}
const result=await addToCart(customer_id,product_id,quantity,price_snapshot)
res.status(201).json({message:'item added to cart',id:result.insertId})
}
    catch(err){
next(err)
    }
}

const fetchCart=async(req,res,next)=>{
    try{
        const customer_id=req.user.id
        const cart=await getCartByCustomer(customer_id)
        res.json(cart)
    }
    catch(err){
        next(err)
    }
}


const updateItem=async(req,res,next)=>{
    try{
const {cart_id,quantity}=req.body
const result=await updateCartItem(cart_id,quantity)
res.json({message:'cart updated'})
    }
    catch(err){
next(err)
    }
}

const removeItem=async(req,res,next)=>{
    try{
const {cart_id}=req.body
const result=await removeCartItem(cart_id)
res.json({message:'item removed'})
    }
    catch(err){
        next(err)
    }
}

module.exports={addItem,fetchCart,updateItem,removeItem}