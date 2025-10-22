const express=require('express')
const cors=require('cors')
const morgan=require('morgan')
const dotenv=require('dotenv')
dotenv.config()
const app=express()
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

module.exports=app;