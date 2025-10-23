const db=require('../config/db')

const addToCart=async(customer_id,product_id,quantity,price)=>{
    const [result]=await db.query(
        'insert into carts (customer_id,product_id,quantity,price_snapshot) values(?,?,?,?)',
        [customer_id,product_id,quantity,price]
    )
    return result
}

const getCartByCustomer=async(customer_id)=>{
    const [rows]=await db.query(
        `select c.*,p.name as product_name,p.sku,p.status
        from carts c
        join products p on c.product_id=p.id
        where c.customer_id=?`,
        [customer_id]
    )
    return rows
}

const updateCartItem=async(cart_id,quantity)=>{
    const [result]=await db.query(
        'update carts set quantity=? where id=?',
        [quantity,cart_id]
    )
    return result
}

const removeCartItem=async(cart_id)=>{
    const [result]=await db.query(
        'delete from carts where id=?',
        [cart_id]
    )
    return result
}

module.exports={
    addToCart,getCartByCustomer,updateCartItem,removeCartItem
}