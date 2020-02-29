const fs = require('fs')
const data = require('../data.json')
const { ageCalc, formatCreatedAt, dateFormat } = require('../utils')


exports.index =  function(req, res){


    return res.render("members/index",{members : data.members})
}

exports.show = function(req,res){
    //req params
    const{ id } = req.params
    
    const foundMember = data.members.find(function(member){
        return id == member.id
    })
    
    
    if (!foundMember){
        return res.send('Member not Found')
    }

    

    const member = {
        ...foundMember,
        age: ageCalc(foundMember.birth) ,
    }



    return res.render("members/show" , {member})

}

exports.create =  function(req, res){
    return res.render("members/create")
}

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
    let maiorId=0
    data.members.forEach(function(i){
        if(i.id>maiorId){
            maiorId = i.id
        }
    })
    req.body.id = maiorId+1
    req.body.created_at = Date.now();

    //Destructuring and organizing.
    const { avatar_url, name, birth, gender, services, id, created_at} = req.body


    data.members.push({
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
        return res.redirect("/members")
    })

}

exports.edit = function(req, res){
    const {id} = req.params
    console.log(id)

    const foundMember = data.members.find(function(i){
        return i.id == id
    })

    if(!foundMember){
        return res.send("Member not found")
    }
    //Data yyyy-mm-dd
    const member = {
        ...foundMember,
        birth : dateFormat(foundMember.birth)
    }


    return res.render('members/edit', {member})
}

exports.put = function(req, res){
    const { id } = req.body
    let index = 0


    const foundMember =data.members.find(function(member, i){
        if(id == member.id){
            index = i
            return true
        }
    })

    if(!foundMember) return res.send("Intructor not found")
    
    const member = {
        ...foundMember,
        ...req.body,
        birth : Date.parse(req.body.birth),
        id: Number(req.body.id)
    }


    data.members[index] = member

    fs.writeFile("./data.json",JSON.stringify(data,null, 2),function(err){
        if(err) return res.send('Writer Error')
        return res.redirect(`/members/${id}`)
    })


}

exports.delete = function(req, res){
   const { id } =req.body
   const filteredMembers = data.members.filter(function(i){
       return id != i.id
   })

   data.members = filteredMembers

   fs.writeFile("./data.json", JSON.stringify(data, null,2), function(err){
       if(err) return res.send("File write error")

       return res.redirect('/members')
   })


}

