const express = require('express');
const produtosRouter = require('./routes/produtos');
const db = require('./config/db')
const app =express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/produtos', produtosRouter);




db.testarConexao();

db.sync({force:false})
.then(() => {
    console.log('Tabelas sincronizadas com o banco de dados.')
    app.listen(8081);

})
.catch(err => {
     console.log("Erro", err)
});


