const express = require('express')
const exphbs = require('express-handlebars')
const conn = require('./db/conn')
const User = require('./models/User')

const app = express()

app.use(express.urlencoded({extended: true}),)

app.use(express.json())

app.use(express.static('public'))

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

// ROTAS
app.get('/', async (req, res) => {

  const user = await User.findAll({raw: true})
  console.log(user)

  res.render('home', {users: user})

})

//Rota de Criação de usuario
app.get('/users/create', (req, res) => {
  res.render('addUser')
})
//Rota de para pegar usuario de usuario
app.post('/users/create', async (req, res) => {

  const name = req.body.name
  const occupation = req.body.occupation
  let newsletter = req.body.newsletter

  if(newsletter == 'on') {
    newsletter = true
  }else {
    newsletter = false
  }
  await User.create({name, occupation, newsletter})

  console.log(req.body)

  res.redirect('/')

})

// Buscando dados com where
app.get('/users/:id', async (req, res) => {
  const id = req.params.id

  const user = await User.findOne({raw:true, where: {id: id}})

  res.render('userViews', {user})
})

// Deletando Registros
app.post('/users/delete/:id', async (req, res) => {
  const id = req.params.id; //

  await User.destroy({raw: true, where: {id: id}})

  res.redirect('/')
})

conn.sync().then(() => {
  app.listen(4000)  
}).catch(err => {console.log(err)});