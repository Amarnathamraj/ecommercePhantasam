const {createUser,getUserByEmail}=require('../models/userModel')
const {hashedPassword,comparePassword}=require('../utils/bcryptUtils')
const generateToken=require('../utils/jwtUtils')

const registerUser=async(req,res,next)=>{
    try{
 const {name,email,password}=req.body
        const exisitingUser=await getUserByEmail(email)
        if(exisitingUser) return res.status(400).json({message:'email already exisits'})

            const hashed=await hashedPassword(password)
            const result=await createUser(name,email,hashed)
            res.status(201).json({message:'user created',userId:result.insertId})
    }
    catch(err){
       next(err)
    }
}

const loginUser=async(req,res,next)=>{
    try{
 const {email,password}=req.body
 const user=await getUserByEmail(email)
 if(!user) return res.status(400).json({message:'invalid credentials'})

    const isMatch=await comparePassword(password,user.password)
    if(!isMatch) return res.status(400).json({message:'invalid credentials'})
        const token=generateToken({id:user.id,email:user.email})
    res.json({token})
    }
    catch(err){
next(err)
    }
}
module.exports={registerUser,loginUser}