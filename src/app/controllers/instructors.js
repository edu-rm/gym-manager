const Instructor = require('../models/Instructor.js')
const { ageCalc, formatCreatedAt, dateFormat } = require('../../lib/utils')

module.exports = {
    index(req, res){
        Instructor.all(function(instructors){
            return res.render("instructors/index", { instructors })
        })
        
    },
    create(req, res){
        return res.render("instructors/create")
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
        Instructor.create(req.body, function(instructor){
            return res.redirect(`/instructors/${instructor}`)
        })

        
    },
    show(req, res){
        return res.send('Working')
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
    
    },
    delete(req, res){
        return
    },
}
