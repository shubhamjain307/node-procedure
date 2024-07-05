const { Sequelize,DataTypes } = require('sequelize');

// 1- dbname,2- username,3- password
const sequelize = new Sequelize('employee', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres'
});


const Emp = sequelize.define('employee',{
    name:{
        type:DataTypes.STRING
    },
    age:{
        type:DataTypes.INTEGER
    },
    country:{
        type:DataTypes.STRING
    }
})


module.exports = {
    sequelize,
    Emp
}