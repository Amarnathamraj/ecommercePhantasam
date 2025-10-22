const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
dotenv.config()

const protect=(req,res,next)=>{
    let token=req.headers['authorization']
    if(!token) return res.status(401).json({message:"not authorized"})

        try{
  const decoded=jwt.verify(token,process.env.JWT_SECRET)
  req.user=decoded
  next()
        }
        catch(err){
return res.status(401).json({message:'invalid token'})
        }
}