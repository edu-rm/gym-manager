


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

    return res.send(req.body)
}

//update



//delete



