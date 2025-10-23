const db=require('../config/db')
const createCustomer=async(name,email,password,lat,lng)=>{
    const [result]=await db.query(
        'insert into customers (name,email,password,latitude,longitude) values(?,?,?,?,?)',
        [name,email,password,lat,lng]
    )
    return result
}

const getCustomerByEmail=async(email)=>{
    const [rows]=await db.query(
        'select *from customers where email=?',[email]
    )
    return rows[0]
}
module.exports={createCustomer,getCustomerByEmail}