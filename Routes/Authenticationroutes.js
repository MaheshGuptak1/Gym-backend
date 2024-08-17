const express= require('express')
const AuthenticationController= require('../controllers/user.controller');

const router=express.Router()

router.post('/adminlogin',AuthenticationController.Login);
router.post('/userlogin',AuthenticationController.Login);

router.post('/userregister',AuthenticationController.userRegister);
router.post('adminregister',(req,res)=>{
    res.send({msg : "Admins cant register "})
});


module.exports=router;