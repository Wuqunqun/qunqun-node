const mysql = require('mysql')

const db = mysql.createPool({
  host: '120.55.55.33',
  user: 'root',
  password: '19961125',
  database: 'vue_node'
})

module.exports = db