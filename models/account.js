import  Sequelize  from "sequelize";
import database from './database.js';

const account = database.define('account',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    email:{
        type: Sequelize.STRING,
        allowNull:false 
    },
    pass:{
        type:Sequelize.STRING,
        allowNull:false 
    },

    
});



export default account;