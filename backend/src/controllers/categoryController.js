const {createCategory,getAllCategories,getCategoryById}=require('../models/categoryModel')

const addCategory=async(req,res,next)=>{
    try{
        const {name}=req.body
        if(!name) return res.status(400).json({message:'name is required'})
            const result=await createCategory(name)
        res.status(201).json({message:'category created',id:result.insertId})
    }
    catch(err){
next(err)
    }
}

const fetchCategories=async(req,res,next)=>{
    try{
const categories=await getAllCategories()
res.json(categories)
    }
    catch(err){
next(err)
    }
}

const fetchCategoryById=async(req,res,next)=>{
    try{
        const category=await getCategoryById(req.params.id)
        if(!category) return res.status(404).json({message:'category not found'})
            res.json(category)

    }
    catch(err){
        next(err)
    }
}
module.exports={addCategory,fetchCategories,fetchCategoryById}