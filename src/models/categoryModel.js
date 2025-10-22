const db=require('../config/db')

const createCategory=async(name)=>{
    const [result]=await db.query(
        'insert into categories (name) values(?)',
        [name]
    )
    return result
}

const getAllCategories=async()=>{
    const [rows]=await db.query('select *from categories')
    return rows
}

const getCategoryById=async(id)=>{
    const [rows]=await db.query('select *from categories where id=?',[id]);
    return rows[0]
}
module.exports={
    createCategory,getAllCategories,getCategoryById
}