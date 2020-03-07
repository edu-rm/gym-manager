const db = require('../../config/db')
const { dateFormat } = require('../../lib/utils')

module.exports = {
    all(callback){
        const query = `SELECT * FROM members ORDER BY name ASC`
        db.query(query, function(err, results){
            if (err) throw err

            callback(results.rows)
            
        })

    },
    create(data, callback){
        const query = `
            INSERT INTO members(
                avatar_url,
                name, 
                email,
                birth, 
                gender,
                blood,
                weight, 
                height,
                instructor_id
            ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
            RETURNING id
        `

        db.query(query, data, function(err, results){
            if (err) throw err
            callback(results.rows[0].id)
        })

    },
    find(id, callback){
        db.query(`SELECT * FROM members WHERE id = $1`,[id],
         function(err, results){
            if (err) throw err
            callback(results.rows[0])
        })
    },
    update(data, callback){
        const query = `
            UPDATE members 
            SET
             avatar_url = ($1),
             name = ($2), 
             email = ($3), 
             gender =  ($4),
             birth = ($5),
             blood = ($6),
             weight = ($7),
             height = ($8),
             instructor_id = ($9)
            WHERE id  = ($10)
        `
        db.query(query, data, function(err, results){
            if(err) throw err
            callback()
        })

    },
    delete(id, callback){
        const query = `
            DELETE FROM members
            WHERE
             id = $1
        `
        db.query(query, [id], function(err, results){
            if (err) throw err
            callback()

        })
    },
    instructorsSelectOptions(callback){
        const query = `SELECT name,id FROM instructors`
        db.query(query,function(err, results){
            if (err) throw err
            callback(results.rows)
        })
    },
    memberShowInstructor(id, callback){
        const query = `
            SELECT i.name FROM instructors i 
            LEFT JOIN members m
            ON m.instructor_id = i.id
            WHERE m.id = $1
        `
        db.query(query,[id],function(err, results){
            if (err) throw err
            callback(results.rows[0].name)
        })
    },
    paginate(params){
        const { filter, limit , offset, callback } = params 
        let query = `
            SELECT *,(
                SELECT count(*) FROM members
            ) AS total FROM members 
        `

        if(params.filter){
            query = `${query} WHERE name ILIKE '${filter}'`
        }
        query = `${query} LIMIT $1 OFFSET $2`

        db.query(query, [limit, offset], function(err, results){
            if (err) throw err
            callback(results.rows)
        })


    }
}