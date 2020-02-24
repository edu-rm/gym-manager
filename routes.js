const express = require("express")
const routes = express.Router() /* Variavel resposavel pelas rotas */

routes.get('/', function(req, res){
    return res.render("instructors/index")
})

routes.get('/instructors', function(req, res){
    return res.render("instructors/index")
})
routes.get('/instructors/create', function(req, res){
    return res.render("instructors/create")
})

routes.post("/instructors", function(req, res){
    //req.query GET
    //req.body Post
    return res.send(req.body)
})
routes.get('/members', function(req,res){
    return res.render("members")
})


module.exports= routes