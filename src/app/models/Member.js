const db = require('../../config/db')
const { dateFormat } = require('../../lib/utils')

module.exports = {
    all(callback){
        const query = `SELECT * FROM MEMBERS`
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
                height
            ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
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
             height = ($8)
            WHERE id  = ($9)
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
    }
}