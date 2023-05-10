import  express  from "express";
const router=express.Router();
import Jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import Auth from '../auth.js';
import Account from "../models/account.js";
import moviesdb from "../models/movies.js";


router.get('/deletemovie/:moviename', async (req, res) => {
    const movieName = req.params.moviename;
    await moviesdb.destroy({ where: { Title: movieName } });
    const movies=await moviesdb.findAll();
    res.render('adminhomepage', { allmovies: movies });
  });



router.get('/adminhomepage' , async(req,res) => {
    const movies=await moviesdb.findAll();

    res.render('adminhomepage',{allmovies:movies})

})

router.get('/homepage' , async(req,res) => {

    const movies=await moviesdb.findAll();

    res.render('homepage',{allmovies:movies})

})



router.get('/registeragain' , async(req,res) => {

    res.render('registeragain')

})

router.get('/loginagain' , async(req,res) => {
    res.render('loginagain')

})



router.post('/registerpost',async(req,res)=>{
    const{email,pass,isadmin}=req.body;

    const hash_pawwword=await bcryptjs.hash(pass,10);

    //chack if there is one username
    const account=await Account.findAll({where:{email:email}});

    if(account.length == 1){
        res.redirect('/myapi/registeragain');
    }
    else{
        Account.create({
            email:email,
            pass:hash_pawwword,
        })
        .then(accoun_created => {
            res.redirect('/myapi/adminhomepage');
        })        
        .catch(error =>{
            return res.status(500).json({
                message:error.message
            })
        })
    }
})



router.get('/register',async(req,res)=>{
    
    res.render('registerpage')

})

router.get('/login',async(req,res)=>{
    
    res.render('loginpage')

})


router.post('/loginpost',async(req,res)=>{

    const{email,pass}=req.body;
    try {
        const account=await Account.findAll({where:{email:email}});
        if(account.length == 1){
            const acc=account[0];
            const isMatch=await bcryptjs.compare(pass,acc.pass);
            if(isMatch){
                const datatotoken={
                    id:acc.id,
                    email:acc.email,
                    pass:pass,
                }



        
                const token = await Jwt.sign(datatotoken,process.env.JWT_KEY ,{expiresIn:'1m'});
                res.redirect('/myapi/adminhomepage');

              
         
                
            }else{
                res.redirect('/myapi/loginagain');

            }
        }else{
            res.redirect('/myapi/loginagain');

        }
    } catch (error) {
        return res.status(500).json({
            message:"ERROR FROM SERVER:"+error
            
        })
    }
   
    

})



export default router;