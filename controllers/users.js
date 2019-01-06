const router = require('express').Router()
const Users = require('./../models/users')
const _ = require('lodash')

router.get('/', (req, res) => {
  Users.getAll()
  .then((users) =>
  res.format({
    html: () => {
      res.render("index_users",
      {
        title : "Users manager",
        h1 : "Users manager",
        users : users
      })
    },
    json: () => {
      res.json(users)
    }
  }))

  .catch((err) => {
    return res.status(404).send(err)
  })
})

router.get('/:id', (req, res) => {
  if (!req.params.id) return res.status(404).send('NOT FOUND')
  Users.findOne(req.params.id)
  .then((user) =>
  res.format({
    html: () => {
      res.render("get_user",
      {
        title : "Users",
        id : user['id'],
        firstname : user['firstname'],
        lastname : user['lastname'],
        email: user['email'],
        username: user['username'],
        password: user['password'],
        created_at: user['created_at'],
        updated_at: user['updated_at']
      })
    },
    json: () => {
      res.json(user)
    }
  }))
  .catch((err) => {
    return res.status(404).send(err)
  })
})


router.get('/:id/todos', (req, res) => {
  Users.findOne(req.params.id)
  .then((users) => {
      Users.getTodos(req.params.id)
      .then((todos) => {
            res.render("user_todos",
            {
              h1 : "User's todos : " + req.params.id,
              title: "User's todos : " + req.params.id,
              users : users,
              todos : todos
            })
      })
    })

  .catch((err) => {
    return res.status(404).send(err)
  })
})

router.post('/', (req, res) => {

  Users.create([req.body.firstname, req.body.lastname, req.body.username, req.body.password, req.body.email])
  .then((user) =>
    res.format({
    html: () => {   
      res.render("add_users",
      {
          title : "NodeExpress",
          id : user['id'],
          firstname : user['firstname'],
          lastname : user['lastname'],
          email: user['email'],
          username: user['username'],
          password: user['password'],
          created_at: user['created_at'],
          updated_at: user['updated_at']
      })
        },
        json: () => {
          res.json(user)
        }
      }))

  .catch((err) => {
    return res.status(404).send(err)
  })
})

router.put('/:id', (req, res) => {
  if (!req.params.id) return res.status(404).send('NOT FOUND')
  req.body.updated_at = new Date()
  req.body.id = req.params.id
  Users.update(req.body)
  .then((user) =>
  res.format({
    html: () => {
      res.render("put_user",
      {
        title : "NodeExpress",
        id : user['id'],
        firstname : user['firstname'],
        lastname : user['lastname'],
        email: user['email'],
        username: user['username'],
        password: user['password'],
        created_at: user['created_at'],
        updated_at: user['updated_at']
      })
    },
    json: () => {
      res.json("User successfully updated ! ")
    }
  }))

  .catch((err) => {
    return res.status(404).send(err)
  })
})

router.delete('/:id', (req, res) => {
  if (!req.params.id) return res.status(404).send('NOT FOUND')
  Users.delete(req.params.id)
  .then(() =>
  res.format({
    html: () => {
      res.render("delete_user",
      {
          title : "test"
      })
    },
    json: () => {
      res.json("User successfully deleted ! ")
    }
  }))

  .catch((err) => {
    return res.status(404).send(err)
  })
})

module.exports = router
