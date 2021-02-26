//Carregando módulos
    const express = require('express');
    const handlebars = require('express-handlebars');
    const bodyParser = require('body-parser');
    const app = express();
    const admin = require('./routes/admin');
    const path = require("path");
    const mongoose = require ('mongoose');
    const session = require('express-session');
    const flash = require('connect-flash');

//Configurando
    //Sessão
        app.use(session({
            secret: "seguranca",
            resave: true,
            saveUninitialized: true
        }))
        app.use(flash());
    //middleware
        app.use((req, res, next) => {
            res.locals.sucesso_msg = req.flash("sucesso_msg")
            res.locals.erro_msg = req.flash("erro_msg")
            next();
        })
    //Body Parser
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(bodyParser.json());

    //handlebars
        app.engine('handlebars', handlebars({defaultLayout: 'main'}));
        app.set('view engine', 'handlebars');
    
    //Mongoose
        mongoose.Promise = global.Promise;
        mongoose.connect("mongodb://localhost/cadastro").then(() => {
            console.log("Conectado com sucesso!");
        }).catch((err) => {
            console.log("Falha ao se conectar ao banco: " +err);
        })
    //public
        app.use(express.static(path.join(__dirname, "public")));
//Rotas
    //referenciando rotas
    app.use('/admin', admin);
//Outros
const PORT = 8081;
app.listen(PORT, () => {
    console.log("Servidor rodando: localhost:8081");
});