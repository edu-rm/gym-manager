const Instructor = require('../models/Instructor.js')
const { ageCalc, formatCreatedAt, dateFormat } = require('../../lib/utils')

module.exports = {
    index(req, res){
        const { filter } = req.query

        if(filter) {
            Instructor.findBy(filter, function(instructors){
                return res.render("instructors/index", { instructors, filter })
            })
        }else{
            Instructor.all(function(instructors){
                return res.render("instructors/index", { instructors })
            })
        }



        
        
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
        Instructor.find(req.params.id, function(instructor){
            if(!instructor) return res.send("Instructor not found 404")

            instructor.age = ageCalc(instructor.birth)
            instructor.services = instructor.services.split(',')
            instructor.created_at = dateFormat(instructor.created_at).formatCreatedAt

            return res.render("instructors/show", { instructor })
        })


    },
    edit(req, res){
        Instructor.find(req.params.id, function(instructor){
            if(!instructor) return res.send("Instructor not found 404")

            instructor.birth = dateFormat(instructor.birth).iso
            

            return res.render("instructors/edit", { instructor })
        })
    },
    put(req, res){
        const keys = Object.keys(req.body)
    
        for (key of keys ){
            if(req.body[key] == ''){
                return res.send("Please, fill all the filds")
            }
        }
        Instructor.update(req.body,function(){
            return res.redirect(`instructors/${req.body.id}`)
        })
    
    },
    delete(req, res){
        Instructor.delete(Number(req.body.id), function(){
            res.redirect("instructors")
        })
    }
}
