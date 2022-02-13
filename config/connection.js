const {Pool} = require('pg')

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'DIYPlatform',
    password: 'postgres',
    port: 5432, 
    idleTimeoutMillis: 20,
    connectionTimeoutMillis: 20,
    max: 20
})

// pool.query('SELECT NOW()', (err, res) => {
//     console.log(err, res)
//     pool.end()
//   })

module.exports = pool