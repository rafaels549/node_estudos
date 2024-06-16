const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('teste', 'rafael', 'afklol57', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432 
});

async function testarConexao() {
  try {
    await sequelize.authenticate();
    sequelize.sync();
    console.log('Conexão bem-sucedida com o banco de dados.');
  } catch (error) {
    console.error('Erro ao conectar-se ao banco de dados:', error);
  }
}


testarConexao();


