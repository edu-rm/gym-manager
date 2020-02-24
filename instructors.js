const fs = require('fs')

//post
exports.post = function(req, res){
    //req.query GET
    //req.body Post

    const keys = Object.keys(req.body)

    for (key of keys ){
        if(req.body[key] == ''){
            return res.send("Please, fill all the filds")
        }
    }

    fs.writeFile("data.json", JSON.stringify(req.body), function(err){
        if (err) throw err
        return res.redirect("/instructors")
    })

}

//update



//delete



