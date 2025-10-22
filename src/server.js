const express=require('express')
const app=express()
app.get('/',(req,res)=>{
    res.send('backend running on render')
})
const PORT=process.env.PORT||5000
app.listen(5000,()=>{
    console.log(`server running on ${PORT}`)
})