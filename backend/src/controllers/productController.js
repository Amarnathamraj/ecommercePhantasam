const {createProduct,getAllProducts,getProductById}=require('../models/productModel')

const addProduct=async(req,res,next)=>{
    try{
const {name,sku,description,price,status,brand_id}=req.body
if(!name||!sku||!price||!brand_id){
    return res.status(400).json({message:'required filed missinhg'})
}
let image=req.file?req.file.path:null
const result=await createProduct({name,sku,description,price,status,brand_id,image})
res.status(201).json({message:'product created',id:result.insertId})
    }
    catch(err){
next(err)
    }
}

const fetchProducts=async(req,res,next)=>{
    try{
const products=await getAllProducts()
res.json(products)
    }
    catch(err){
        next(err)
    }
}

const fetchProductById=async(req,res,next)=>{
    try{
const product=await getProductById(req.params.id)
if(!product) return res.status(404).json({message:'prduct not found'})
    res.json(product)
    }
    catch(err){
        next(err)
    }
}
module.exports={
    addProduct,fetchProducts,fetchProductById
}