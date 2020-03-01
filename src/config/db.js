const { Pool } = require('pg') //Se eu nao usar o tipo pull todas as vezes que eu for fazer uma query eu vou precisar enviar login e senha


module.exports = new Pool({
    user : 'postgres',
    password : 'toor',
    host: 'locahost',
    port: 5432,
    database : 'gymmanager'
})