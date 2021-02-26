//Criando rotas em arquivos separados
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
require("../models/Cadastro");
const Cadastro = mongoose.model("cadastros")

router.get('/', (req, res) => {
    res.render("admin/index")
})

router.get('/posts', (req, res) => {
    res.send("Página de posts");
})

router.get('/cadastros', (req, res) => {
    Cadastro.find().lean().then((cadastros) => {
        res.render("admin/cadastros", {cadastros: cadastros});
    }).catch((err) => {
        req.flash("erro_msg", "Houve um erro ao listar os cadastros! "+err);
        res.redirect("/admin")
    })   
})

router.get('/cadastros/add', (req, res) => {
    res.render("admin/addCad");
})

router.post("/cadastros/nova", (req, res) => {
    
    var erros = [];
    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null){
        erros.push({texto: "Nome invalido"})
    }
    
    if(!req.body.sobrenome || typeof req.body.sobrenome == undefined || req.body.sobrenome == null){
        erros.push({texto: "Sobrenome invalido"})
    }
    
    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null){
        erros.push({texto: "E-mail invalido"})
    }

    if(erros.length > 0){
        res.render("admin/addCad", {erros: erros})
    }else{
        const novoCadastro = {
            nome: req.body.nome,
            sobrenome: req.body.sobrenome,
            email: req.body.email
        }
    
        new Cadastro(novoCadastro).save().then(() => {
            req.flash("sucesso_msg", "Cadastro efetuado com sucesso! ");
            res.redirect("/admin/cadastros");
        }).catch((err) => {
            req.flash("erro_msg", "Houve um erro ao efetuar seu cadastro, tente novamente. ");
            res.redirect("/admin");
        })
    }


})


module.exports = router;