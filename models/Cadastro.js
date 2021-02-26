const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Cadastro = new Schema({
    nome: {
        type: String,
        required: true
    },
    sobrenome: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("cadastros", Cadastro);