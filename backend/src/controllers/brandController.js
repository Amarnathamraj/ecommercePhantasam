const {createBrand,getAllBrands,getBrandById}=require('../models/brandModel')

const addBrand=async(req,res,next)=>{
    try{
const {name}=req.body
if(!name){
    return res.status(400).json({message:'name is required'})
}
const result=await createBrand(name)
res.status(201).json({message:'brand created',id:result.insertId})
    }
    catch(err){
next(err)
    }
}

const fetchBrands=async(req,res,next)=>{
    try{
const brands=await getAllBrands()
res.json(brands)
    }
    catch(err){
        next(err)
    }
}

const fetchBrandById=async(req,res,next)=>{
    try{
const brand=await getBrandById(req.params.id)
if(!brand){
    return res.status(404).json({message:'brand not found'})
}
res.json(brand)
    }
    catch(err){

    }
}

module.exports={
    addBrand,fetchBrands,fetchBrandById
}