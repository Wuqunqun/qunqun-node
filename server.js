const express = require('express')
const cors = require('cors')
const userRouter = require('./router/user')
const app = express()
const expressJWT = require('express-jwt')
const config = require('./config')

app.use(cors())
// app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use((req,res,next)=>{
  res.sd = function(err,status=1){
    res.send({
      status,
      message:err instanceof Error ? err.message : err
    })
  }
  next()
})
app.use(expressJWT({secret:config.jwtSecretKey,algorithms:['HS256']}).unless({path:['/login','/register']}))

app.use(userRouter)

app.post('/test', (req, res) => {
  const sqlStr = 'select * from users'
})


app.use((err,req,res,next)=>{
  if(err.name==='UnauthorizedError'){
    res.send({
      status:50008,
      message:'无效的token'
    })
  }else{
    res.send({
      status:500,
      message:err.message
    })
  }
  
  
})
app.listen(3001, () => {
  console.log('server running at http://loacalhost:3001')
})