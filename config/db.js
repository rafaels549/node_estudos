const { Sequelize } = require('sequelize');
require('dotenv').config();


const db_user = process.env.DB_USER

const db_password = process.env.DB_PASS

const db_name = process.env.DB_NAME


const sequelize = new Sequelize("teste" , "rafael", "afklol57", {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432 
});

async function testarConexao() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Conexão bem-sucedida com o banco de dados.');
  } catch (error) {
    console.error('Erro ao conectar-se ao banco de dados:', error);
  }
}


testarConexao();


module.exports ={sequelize ,testarConexao} ;