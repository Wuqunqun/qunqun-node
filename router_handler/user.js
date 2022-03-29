const bcypt = require('bcryptjs')
const db = require('../db/index')
const jwt = require('jsonwebtoken')
const config = require('../config')

exports.register = (req, res) => {
  const userinfo = req.body
  const sql = 'select * from users where username = ?'
  db.query(sql, userinfo.username, (err, results) => {
    if (err) return res.sd(err)
    if (results.length > 0) {
      console.log('1')
      return res.sd('用户名已经存在！')
    }
    userinfo.password = bcypt.hashSync(userinfo.password, 10)
    const sql = 'insert into users set ?'
    db.query(sql, {
      username: userinfo.username,
      password: userinfo.password
    }, (err, results) => {
      if (err) {
        console.log('2')
        return res.sd(err)
      }
      if (results.affectedRows !== 1) {
        console.log('3')
        return res.sd('注册失败')
      }
      res.sd('注册成功', 0)

    })
  })

}

exports.login = (req, res) => {
  const userinfo = req.body
  const username = userinfo.username
  const password = userinfo.password
  const sqlStr = 'select * from users where username = ?'
  db.query(sqlStr, username, (err, results) => {
    if (err) return res.sd(err)
    if (results.length !== 1) return res.sd('用户不存在！')
    const compareRusults = bcypt.compareSync(password, results[0].password)
    if (!compareRusults) return res.sd('密码错误！')
    const user = {
      ...results[0],
      password: ''
    }
    const tokenStr = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: config.expiresIn
    })
    res.send({
      status: 0,
      message: '登陆成功',
      token: 'Bearer ' + tokenStr
    })

  })
}

exports.getInfo = (req, res) => {
  // console.log(req.body)
  //  console.log(req.user)
  res.send({
    status: 0,
    name: req.user.username + ' 大人',
    // message: '用户信息获取成功',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
  })
}

exports.logout = (req, res) => {
  res.send({
    status: 0,
    message:'退出成功'
  })
}

exports.getUsers = (req, res) => {
  const sqlStr = 'select * from users'
  db.query(sqlStr, (err, results) => {
    if (err) return res.sd(err)
    console.log(results);
    res.send({
      status: 0,
      message: '查询成功！'
    })
  })
}