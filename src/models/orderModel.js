const db=require('../config/db')

const createOrder=async(order)=>{
    const {customer_id,total_amount,status}=order
    const [result]=await db.query(
        'insert into orders (customer_id,total_amount,status) values(?,?,?)',
        [customer_id,total_amount,status]
    )
    return result
}

const addOrderItem=async(order_id,product_id,quantity,price_snapshot)=>{
    const [result]=await db.query(
        'insert into order_items (order_id,product_id,quantity,price_snapshot) values(?,?,?,?)',
       [order_id,product_id,quantity,price_snapshot] 
    )
    return result;
}

//get orders by customer
const getOrdersByCustomer=async(customer_id)=>{
    const [rows]=await db.query(
        'select *from orders where customer_id=? order by created_at desc',
        [customer_id]
    )
    return rows;
}

//get order Details
const getOrderById=async(order_id)=>{
    const [rows]=await db.query(
        `select o.*,oi.product_id,oi.quantity,oi.price_snapshot
        from orders o
        join order_items oi on o.id=oi.order_id
        where o.id=?`,
        [order_id]
    )
    return rows
}
module.exports={
    createOrder,addOrderItem,getOrdersByCustomer,getOrderById
}