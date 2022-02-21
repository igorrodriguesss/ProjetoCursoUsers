const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sequelize', 'root', 'root',{
    host: 'localhost',
    dialect: 'mysql'
})

//try{
//    sequelize.authenticate()
//    console.log('Conexão realizada com o banco!')
//
//}catch{
//    console.log('Não foi possivel se conectar ao banco', error)
//}

module.exports = sequelize;