import  Sequelize  from "sequelize";
import database from './database.js';

const movies = database.define('movies',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    Title:{
        type: Sequelize.STRING,
        allowNull:false 
    },
    Poster:{
        type:Sequelize.STRING,
        allowNull:false 
    },
    Year:{
        type:Sequelize.STRING,
        allowNull:false 
    },
    Genre:{
        type:Sequelize.STRING,
        allowNull:false 
    },
    price:{
        type:Sequelize.DOUBLE,
        allowNull:false 
    }

    
});



export default movies;