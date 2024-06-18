const { Sequelize } = require('sequelize');
require('dotenv').config

const db_user = process.env.DB_USER

const db_password = process.env.DB_PASS

const db_name = process.env.DB_NAME


const db= new Sequelize(db_name , db_user, db_password, {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432 
});

async function testarConexao() {
  try {
    await db.authenticate();
    await db.sync();
    console.log('Conexão bem-sucedida com o banco de dados.');
  } catch (error) {
    console.error('Erro ao conectar-se ao banco de dados:', error);
  }
}


testarConexao();


module.exports ={db,testarConexao} ;