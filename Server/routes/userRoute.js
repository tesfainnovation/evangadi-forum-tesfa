const express =require('express')
const router =express.Router()
const {rejester,login,checkuser}=require('../controller/userController')
const middleware =require('../middleware/auth')

// rejester router

router.post("/rejester",rejester);
router.post("/login", login);
router.post("/check", middleware,checkuser);



module.exports=router