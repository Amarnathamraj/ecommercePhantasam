const mysql=require('mysql2/promise')
const dotenv=require('dotenv')
dotenv.config()

const db=mysql.createPool({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    waitForConnections:true,
    connectionLimit:10,
    queueLimit:0
})
const testConnection=async()=>{
    try{
        await db.getConnection()
        console.log('mysql database connected succesfully')
    }
    catch(err){
       console.log('database connection failed',err.message)
    }
}
testConnection()
module.exports={db}