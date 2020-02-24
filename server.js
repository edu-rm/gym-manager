const express = require("express")
const nunjucks = require("nunjucks")
const routes = require("./routes")

const server = express()



server.use(express.urlencoded({extended: true}))// responsavel por fazer funcionar o req.body
server.use(express.static('public')) /* Middlewere  */
server.use(routes)



server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape:false,
    noCache:true
})




server.listen(5000, function(){
    console.log("server is running")
})
