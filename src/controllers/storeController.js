const {createStore,getAllStores,getStoreById}=require('../models/storeModel')
const addStore=async(req,res,next)=>{
    try{
const {name,code,contact,address,latitude,longitude}=req.body
if(!name||!code){
    return res.status(400).json({message:'name and code required'})
}
const result=await createStore({
    name,
    code,
    contact,
    address,
    latitude,
    longitude,
   
})
 res.status(201).json({ message: "store created", id: result.insertId });
    }
    catch(err){
next(err)
    }
}

const fetchStores=async(req,res,next)=>{
    try{
        const stores=await getAllStores()
        res.json(stores)
    }
    catch(err){
        next(err)
    }
}

const fetchStoreById=async(req,res,next)=>{
    try{
        const store=await getStoreById(req.params.id)
        if(!store){
            return res.status(404).json({message:'store not found'})
        }
        res.json(store)
    }
    catch(err){
        next(err)
    }
}
module.exports={addStore,fetchStores,fetchStoreById}