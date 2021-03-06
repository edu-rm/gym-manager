const express = require("express")
const nunjucks = require("nunjucks")
const routes = require("./routes")
const methodOverride = require('method-override')


const server = express()



server.use(express.urlencoded({extended: true}))// responsavel por fazer funcionar o req.body (POST)
server.use(express.static('public')) /* Middlewere  */
server.use(methodOverride('_method'))
server.use(routes)



server.set("view engine", "njk")

nunjucks.configure("src/app/views", {
    express: server,
    autoescape:false,
    noCache:true
})




server.listen(5000, function(){
    console.log("server is running")
})
