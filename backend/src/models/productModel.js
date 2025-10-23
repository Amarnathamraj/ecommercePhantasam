const db=require('../config/db')

const createProduct=async(product)=>{
    const {name,sku,description,price,status,brand_id}=product;
    const [result]=await db.query(
        'insert into products (name,sku,description,price,status,brand_id) values(?,?,?,?,?,?)',
        [name,sku,description,price,status,brand_id]
    )
    return result;
}

//get all prods with brand and categories
const getAllProducts=async()=>{
    const [rows]=await db.query(
        `select p.*,b.name as brand_name from products p left join brands b on p.brand_id=b.id`
    )
    return rows
}

//get prod by id
const getProductById=async(id)=>{
    const [rows]=await db.query(`
        select p.*,b.name as brand_name from products p left join brands b on p.brand_id=b.id where p.id=?`,[id]);
        return rows[0]
}

module.exports={
    createProduct,getAllProducts,getProductById
}