const express = require("express")
const routes = express.Router() /* Variavel resposavel pelas rotas */

routes.get('/', function(req, res){
    return res.render("instructors/index")
})

routes.get('/instructors', function(req, res){
    return res.render("instructors/index")
})

routes.get('/members', function(req,res){
    return res.render("members")
})


module.exports= routes