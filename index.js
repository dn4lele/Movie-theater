import express from "express";
import dotenv from 'dotenv';
import actions from './controller/actions.js';
dotenv.config();
import database from './models/database.js';

const app = express();

app.set("view engine" , "ejs" )
app.set("views","views")

app.use(express.urlencoded({extended:false}));
app.use(express.json());

const port=process.env.PORT;

//ROUTES
app.use('/myapi',actions);

database
.sync()
.then(results => {
    console.log(results)
    app.listen(port,()=>{console.log(`the server is running via port ${port}`)});

})
.catch(error => console.log(error.message))







