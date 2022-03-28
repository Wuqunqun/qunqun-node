const mysql = require('mysql')

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '19961125',
  database: 'vue_node'
})

module.exports = db