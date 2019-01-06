const db = require('sqlite')
const express = require('express')
const bodyParser = require('body-parser')
const api = express()
const methodOverride = require('method-override')


api.set('views', './views')
api.set('view engine', 'hbs')
api.use(methodOverride('_method'))


db.open('api.db').then(() => {
  Promise.all([
    db.run("CREATE TABLE IF NOT EXISTS todos (name, completion, user_id, created_at, updated_at)"),
    db.run("CREATE TABLE IF NOT EXISTS users (firstname, lastname, username, password, email, created_at, updated_at)"),
  ]).then(() => {
    console.log('Database Ready !')
  }).catch((err) => {
    console.log('Error :', err)
  })
})



api.use(bodyParser.json())
api.use(bodyParser.urlencoded({ extended: false }))
api.use('/todos', require('./controllers/todos.js'))
api.use('/users', require('./controllers/users.js'))
api.listen(3000);

console.log("http://localhost:3000/todos ");
console.log("http://localhost:3000/users ");
