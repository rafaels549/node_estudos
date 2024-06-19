const express = require('express');
const userRouter = require('./routes/user');
const {sequelize, testarConexao} = require('./config/db')
const app =express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('auth', userRouter);




testarConexao();

sequelize.sync({force:false})
.then(() => {
    console.log('Tabelas sincronizadas com o banco de dados.')
    app.listen(8081);

})
.catch(err => {
     console.log("Erro", err)
});



