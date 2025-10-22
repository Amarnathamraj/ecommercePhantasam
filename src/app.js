const express=require('express')
const cors=require('cors')
const morgan=require('morgan')
const dotenv=require('dotenv')
const errorHandler=require('./middlewares/errorMiddleware')

const userRoutes=require('./routes/userRoutes')
const customerRoutes=require('./routes/customerRoutes')

dotenv.config()

const app=express()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

//routes
app.get('/',(req,res)=>{
    res.send('server running')
})
app.use('/api/users',userRoutes)
app.use('/api/customers',customerRoutes)


app.use(errorHandler)
module.exports=app;