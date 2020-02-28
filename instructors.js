const fs = require('fs')
const data = require('./data.json')
const { ageCalc, formatCreatedAt, dateFormat } = require('./utils')

//Show

exports.show = function(req,res){
    //req params
    const{ id } = req.params
    
    const foundInstructor = data.instructors.find(function(instructor){
        return id == instructor.id
    })
    
    
    if (!foundInstructor){
        return res.send('Instructor not Found')
    }

    

    const instructor = {
        ...foundInstructor,
        age: ageCalc(foundInstructor.birth) ,
        services : foundInstructor.services.split(','),
        created_at : formatCreatedAt(foundInstructor.created_at)
    }



    return res.render("instructors/show" , {instructor})

}


//post
exports.post = function(req, res){
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
    req.body.birth = Date.parse(req.body.birth)
    req.body.id = Number(data.instructors.length + 1)
    req.body.created_at = Date.now();

    //Destructuring and organizing.
    const { avatar_url, name, birth, gender, services, id, created_at} = req.body


    data.instructors.push({
        id,
        name,
        avatar_url,
        birth,
        gender,
        services,
        created_at
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
        if (err) throw err
        return res.redirect("/instructors")
    })

}

//update

exports.edit = function(req, res){
    const {id} = req.params
    console.log(id)

    const foundInstructor = data.instructors.find(function(i){
        return i.id == id
    })

    if(!foundInstructor){
        return res.send("Instructor not found")
    }
    //Data yyyy-mm-dd
    const instructor = {
        ...foundInstructor,
        birth : dateFormat(foundInstructor.birth)
    }


    return res.render('instructors/edit', {instructor})
}

exports.put = function(req, res){
    const { id } = req.body
    


    const foundInstructor =data.instructors.find(function(instructor){
        return id == instructor.id
    })

    if(!foundInstructor) return res.send("Intructor not found")
    
    const instructor = {
        ...foundInstructor,
        ...req.body,
        birth : Date.parse(req.body.birth)
    }


    data.instructors[id-1] = instructor

    fs.writeFile("./data.json",JSON.stringify(data,null, 2),function(err){
        if(err) return res.send('Writer Error')
        return res.redirect(`/instructors/${id}`)
    })


}


//delete

exports.delete = function(req, res){
   
}

