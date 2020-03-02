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
    create(){

    },
    find(id, callback){
        db.query(`SELECT * FROM members WHERE id = $1`,[id],
         function(err, results){
            if (err) throw err
            callback(results.rows[0])
        })
    },
    update(){

    },
    delete(){

    }
}