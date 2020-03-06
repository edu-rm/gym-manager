const db = require('../../config/db')
const { ageCalc, dateFormat } = require('../../lib/utils')

module.exports ={
    all(callback){
        db.query(`SELECT i.*, count(m) AS total_students
        FROM instructors i 
        LEFT JOIN members m
        ON (i.id = m.instructor_id)
        GROUP BY i.id`, 
        function(err, results){
            if(err) throw err
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
            if(err) throw err
            callback(results.rows[0].id)
        })
    },
    find(id, callback){
        db.query(`SELECT * FROM instructors WHERE id = $1`, [id],
        function(err, results){
            if(err) throw err
            callback(results.rows[0])
        })

    },
    update(data, callback){
        const query =`
        UPDATE instructors SET
            avatar_url =($1),
            name =($2),
            birth =($3),
            gender =($4),
            services =($5)
        WHERE id = $6
        `
        const values = [
            data.avatar_url,
            data.name,
            dateFormat(data.birth).iso,
            data.gender,
            data.services,
            data.id
        ]

        db.query(query, values, function(err, results){
            if (err) throw err
            callback()
        })
    },
    delete(id, callback){
        query = `DELETE FROM instructors WHERE id = $1`
        db.query(query, [id], function(err, result){
            if (err) throw err
            return callback()
        })
    },
    findBy(filter, callback){
        db.query(`SELECT i.*, count(m) AS total_students
        FROM instructors i 
        LEFT JOIN members m
        ON (i.id = m.instructor_id)
        WHERE i.name ILIKE '%${filter}%'
            OR i.services ILIKE '%${filter}%'
        GROUP BY i.id`, 
        function(err, results){
            if(err) throw err
            callback(results.rows)
        })
    },
    paginate(params){
        const { filter, limit, offset, callback } = params

        let query = `
            SELECT i.*, count(m) as total_students FROM instructors i 
            LEFT JOIN  members m ON i.id = m.instructor_id
        `

        if(filter){
            query = `${query}
            WHERE i.name ILIKE '%${filter}%'
            OR i.services ILIKE '%${filter}%'
            `
        }

        query = `${query}
            GROUP BY i.id LIMIT $1 OFFSET $2 
        `

        db.query(query, [limit,offset], function(err, results){
            if(err) throw err
            callback(results.rows)
        })


    }
}