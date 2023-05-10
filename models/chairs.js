import  Sequelize  from "sequelize";
import database from './database.js';


const chairs = database.define('chairs',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    istaken:Sequelize.BOOLEAN,
    
    
});



export default chairs;