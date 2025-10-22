const db=require('../config/db')

const createBrand=async(name)=>{
    const [result]=await db.query(
        'insert into brands (name) values(?)',
        [name] 
    )
    return result
}

const getAllBrands=async()=>{
    const [rows]=await db.query('select *from brands')
    return rows;
}

const getBrandById=async(id)=>{
    const [rows]=await db.query(
        'select *from brands where id=?',[id]
    )
    return rows[0]
}

module.exports={
    createBrand,getAllBrands,getBrandById
}