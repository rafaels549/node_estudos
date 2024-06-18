const express = require('express');
const eventosRouter = require('./routes/produtos');
const {db, testarConexao} = require('./config/db')
const app =express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/produtos', eventosRouter);




testarConexao();

db.sync({force:false})
.then(() => {
    console.log('Tabelas sincronizadas com o banco de dados.')
    app.listen(8081);

})
.catch(err => {
     console.log("Erro", err)
});



