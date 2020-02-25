const fs = require('fs')
const data = require('./data.json')

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
    req.body.birth = Date.parse(req.body.birth)
    req.body.created_at = Date.now();

    data.instructors.push(req.body)

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) throw err
        return res.redirect("/instructors")
    })

}

//update



//delete



