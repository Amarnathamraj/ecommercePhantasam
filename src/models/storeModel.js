const db=require('../config/db')

const createStore=async(store)=>{
    const {name,code,contact,address,latitude,longitude}=store;
    const [result]=await db.query(
        'insert into stores (name,code,contact,address,latitude,longitude) values(?,?,?,?,?,?)',
        [name,code,contact,address,latitude,longitude]
    )
    return result;
}

//get all stores
const getAllStores=async()=>{
    const [rows]=await db.query('select *from stores')
    return rows;
}

//get store by id
const getStoreById=async(id)=>{
    const [rows]=await db.query('select *from stores where id=?',[id])
    return rows[0]
}
module.exports={
    createStore,getAllStores,getStoreById
}