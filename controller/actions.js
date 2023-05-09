import  express  from "express";
const router=express.Router();
import Jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import Auth from '../auth.js';
import Account from "../models/account.js";



router.get('/homepage' , async(req,res) => {


    res.render('homepage')



})

router.post('/shop' , Auth  , async(req,res)=>{


    const{name,price,image}=req.body;
    
    Products.create({
        name:name,
        price:price,
        image:image,
        publisherId:req.user.id,
    })
    .then(account_created =>
        {
        return res.status(200).json({
        message:account_created
    })})
    .catch(error =>{
        return res.status(500).json({
            message:error.message
        })
    })


})



router.post('/register',async(req,res)=>{

    const{firstname,lastname,email,password,avatar}=req.body;

    const hash_pawwword=await bcryptjs.hash(password,10);

    //chack if there is one username
    const account=await Account.findAll({where:{email:email}});

    if(account.length == 1){
        return res.status(200).json({
            message:"Email already in use"
        })
    }
    else{
        Account.create({
            firstname:firstname,
            lastname:lastname,
            email:email,
            pass:hash_pawwword,
            avatar:avatar,
            isApprove:false,
            code:generateRandomIntegerInRange(1000,9999)
        })
        .then(accoun_created =>
            {
            return res.status(200).json({
            message:accoun_created
        })})
        .catch(error =>{
            return res.status(500).json({
                message:error.message
            })
        })
    }



})


router.post('/login',async(req,res)=>{

    const{email,password}=req.body;
    try {
        const account=await Account.findAll({where:{email:email}});
        if(account.length == 1){
            const acc=account[0];
            const isMatch=await bcryptjs.compare(password,acc.pass);
            if(isMatch){
                const datatotoken={
                    id:acc.id,
                    email:acc.email,
                    firstname:acc.firstname,
                    lastname:acc.lastname,
                }

                const token = await Jwt.sign(datatotoken,process.env.JWT_KEY ,{expiresIn:'30d'});



                return res.status(200).json({
                    message:"OK",
                    token:token,
                    
                })
            }else{
                return res.status(401).json({
                    message:"not the right password"
                    
                })
            }
        }else{
            return res.status(200).json({
                message:"user not found"
                
            })
        }
    } catch (error) {
        return res.status(500).json({
            message:"ERROR FROM SERVER:"+error
            
        })
    }
   
    

})



export default router;