const express=require('express')
const {addStore,fetchStores,fetchStoreById}=require('../controllers/storeController')
const protect=require('../middlewares/authMiddleware')


const router=express.Router()

router.post('/',protect,addStore)
router.get('/',fetchStores)
router.get('/:id',fetchStoreById)

module.exports=router;