const db = require('../../config/db')
const { ageCalc, formatCreatedAt, dateFormat } = require('../../lib/utils')

module.exports ={
    all(callback){
        db.query(`SELECT * FROM instructors`, function(err, results){
            if(err) res.send(err)
            callback(results.rows)
        })

    },
    create(reqBody, callback){
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
        const { name, avatar_url, gender, services, birth} = reqBody
        const values =[
            name,
            avatar_url,
            gender,
            services,
            dateFormat(birth).iso,
            dateFormat(Date.now()).iso
        ]
        

        db.query(query,values, function(err, results){
            if(err) return res.send(err)
            callback(results.rows[0].id)
        })
    },
    find(id, callback){
        db.query(`SELECT * FROM instructors WHERE id = $1`, [id],
        function(err, results){
            console.log(results)
            if(err) return res.send(err)
            callback(results.rows[0])
        })

    }


}