const db=require('../config/db')
const createUser=async(name,email,password)=>{
    const [result]=await db.query(
        'insert into users (name,email,password) values(?,?,?)',
        [name,email,password]
    )
    return result;
}

const getUserByEmail=async(email)=>{
    const [rows]=await db.query(
        'select *from users where email=?',[email]
    )
    return rows[0]
}
module.exports={
    createUser,
    getUserByEmail
}