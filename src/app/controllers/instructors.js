const { ageCalc, formatCreatedAt, dateFormat } = require('../../lib/utils')
const db = require('../../config/db')
module.exports = {
    index(req, res){
        return res.render("instructors/index")
    },
    create(req, res){
        return res.render("instructors/create")
    },
    post(req, res){
        const created_at = Date()
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
        const query = `
            INSERT INTO instructors(
                name, 
                avatar_url,
                gender,
                services,
                birth,
                created_at
            ) values($1,$2,$3,$4,$5,$6)
            RETURNING id
        `
        const { name, avatar_url, gender, services, birth} = req.body
        const values =[
            name,
            avatar_url,
            gender,
            services,
            dateFormat(birth).iso,
            dateFormat(created_at).iso
        ]


        db.query(query,values, function(err, results){
            if(err) return res.send(err)
            console.log(results)
            return res.redirect(`/instructors/${results.rows[0].id}`)
        })

        
    },
    show(req, res){
        return
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
