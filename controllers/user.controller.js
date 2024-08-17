const User=require('../entity/Authentication.entity');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');

dotenv.config();
const userRegister=async (req,res)=>{
    try{
        const {name,email,password,confirmpassword}= req.body;
        const existingUser = await User.query
            .emailIndex({ email })
            .go()
            .then(res => res.data[0]);
        
        
        if(existingUser){
            res.status(500).json({message : "Email already taken"});
        }
        else if(password!=confirmpassword){
            res.status(500).json({message : "Password Does not matched"});
        }
        else{
            const salt=10;
            const hashedPassword=await bcrypt.hash(password,salt);
            const data=new User({
                name,
                email,
                password:hashedPassword
            });
            await data.put()
            res.status(200).json({message  :"Register Success"});
        }
    }
    catch(err){
        res.status(500).json({Error: err.message});
    }
}


const Login=async (req,res)=>{
    try{
        const {email,password}= req.body;
        const Obj = await User.query
        .emailIndex({ email })
        .go()
        .then(res => res.data[0]);
        const secretkey=process.env.secretkey;
        const k=await bcrypt.compare(password,Obj.password);
        if(!k){
            res.status(400).json({message : "user not found"})
        }
        else if(Obj.admin=="1")
        {
            var token=jwt.sign({AdminId: Obj.email}, secretkey);
            res.status(200).json({message : "Login Success as Admin" , Admintoken})
        }
        else{
            var token=jwt.sign({UserId: Obj.email}, secretkey);
            res.status(200).json({message : "Login Success as User", Usertoken})
        }
    }
    catch(err){
        res.status(500).json({Error: err.message});
    }
}


module.exports={userRegister,Login};