const {createOrder,addOrderItem,getOrdersByCustomer,getOrderById}=require('../models/orderModel')
const {razorpayInstance}=require('../utils/razorpay')
const crypto=require('crypto')
const db=require('../config/db')

//create order and razorpay order
const createNewOrder=async(req,res,next)=>{
    try{
const {total_amount,items}=req.body
const customer_id=req.user.id
if(!items||!total_amount) return res.status(400).json({message:'order data missing'})
    //creating order in db

const order=await createOrder({customer_id,total_amount,status:'CREATED'})
//ADDINg order items
for(const item of items){
    await addOrderItem(order.insertId,item.product_id,item.quantity,item.price_snapshot)
}

//create razorpay order
const razorpayOrder=await razorpayInstance.orders.create({
    amount:total_amount*100,
    currency:'INR',
    receipt:`order_${order.insertId}`
})
res.status(201).json({
    message:'order created',
    orderId:order.insertId,
    razorpayOrder
})
    }
    catch(err){
next(err)
    }
}

//verify razorpayment 
const verifyPayment=async(req,res,next)=>{
    try{
const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body
const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
const generated_signature = hmac.digest("hex");
if (generated_signature !== razorpay_signature) {
  return res.status(400).json({ message: "Payment verification failed" });
}
// Update order status to PAID
await db.query("UPDATE orders SET status=? WHERE id=?", [
  "PAID",
  razorpay_order_id.split("_")[1],
]);

//await db.query('UPDATE orders SET status=? WHERE id=?', ['PAID', razorpay_order_id.split('_')[1]]);
res.json({ message: "Payment verified and order updated" });
    }
    catch(err){
next(err)
    }
}

// Fetch customer orders
const fetchOrders = async (req, res, next) => {
    try {
        const orders = await getOrdersByCustomer(req.user.id);
        res.json(orders);
    } catch (err) {
        next(err);
    }
};

module.exports = {
    createNewOrder,
    verifyPayment,
    fetchOrders}