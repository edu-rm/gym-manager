const { ageCalc, formatCreatedAt, dateFormat } = require('../../lib/utils')
const Member = require('../models/Member')

module.exports = {
    index(req, res){
        Member.all(function(members){
            return res.render("members/index", {members})
        })
        
    },
    create(req, res){
        return res.render("members/create")
    },
    post(req, res){
        //req.query GET
        //req.body Post
    
        //Validation
    
        const keys = Object.keys(req.body)
    
        for (key of keys ){
            if(req.body[key] == ''){
                return res.send("Please, fill all the filds")
            }
        }
        
        //Treatment
       return
    },
    show(req, res){
        Member.find(req.params.id, function(value){
            if(!value) return res.send("Member not found")
            const { id, name, avatar_url, email, gender, birth, blood, weight, height} = value
            const member = {
                id, 
                name,
                avatar_url,
                email,
                gender,
                birth:dateFormat(birth).birthday,
                blood,
                weight,
                height
            }

            return res.render('members/show', { member })
        })
    },
    edit(req, res){
        return
    },
    put(req, res){
        const keys = Object.keys(req.body)
    
        for (key of keys ){
            if(req.body[key] == ''){
                return res.send("Please, fill all the filds")
            }
        }
        return
    },
    delete(req, res){
        return
    },
}
