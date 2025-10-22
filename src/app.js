const express=require('express')
const cors=require('cors')
const morgan=require('morgan')
const dotenv=require('dotenv')
const errorHandler=require('./middlewares/errorMiddleware')

const userRoutes=require('./routes/userRoutes')
const customerRoutes=require('./routes/customerRoutes')
const brandRoutes=require('./routes/brandRoutes')
const categoryRoutes=require('./routes/categoryRoutes')
const storeRoutes=require('./routes/storeRoutes')
const productRoutes=require('./routes/productRoutes')

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
app.use('/api/brands',brandRoutes)
app.use('/api/categories',categoryRoutes)
app.use('/api/stores',storeRoutes)
app.use('/api/products',productRoutes)


app.use(errorHandler)
module.exports=app;