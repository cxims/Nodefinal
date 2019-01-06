const router = require('express').Router()
const Todos = require('./../models/todos')
const _ = require('lodash')

router.get('/', (req, res) => {
  Todos.getAll()
  .then((todos) =>
  res.format({
    html: () => {
      res.render("index_todos",
      {
        title : "Todos manager",
        h1 : "Todos manager",
        todos : todos
      })
    },
    json: () => {
      res.json(todos)
    }
  }))

  .catch((err) => {
    return res.status(404).send(err)
  })
})

router.get('/:id', (req, res) => {
  if (!req.params.id) return res.status(404).send('NOT FOUND')
  Todos.findOne(req.params.id)
  .then((todo) =>
  res.format({
    html: () => {
      res.render("get_todos",
      {
          title : "test",
          name: todo['name'],
          completion: todo['completion'],
          id: todo['id'],
          user_id: todo['user_id'],
          created_at: todo['created_at'],
          updated_at: todo['updated_at']
      })
    },
    json: () => {
      res.json(todo)
    }
  }))

  .catch((err) => {
    return res.status(404).send(err)
  })
})

router.post('/', (req, res) => {
  if (!req.body || (req.body && (!req.body.name || !req.body.completion || !req.body.user_id)))
  return res.status(404).send('NOT FOUND')

  Todos.create(req.body)
  .then((todo) =>
  res.format({
  html: () => {
    res.render("add_todos",
    {
        title : "test",
        id : todo['id'],
        name : todo['name'],
        completion : todo['completion']
    })
  },
  json: () => {
    res.json(todo)
  }
}))
  .catch((err) => {
    return res.status(404).send(err)
  })
})

router.put('/edit/:id', (req, res) => {
  if (!req.params.id) return res.status(404).send('NOT FOUND')
  req.body.updated_at = new Date()

  req.body.id = req.params.id
  Todos.update(req.body)
  .then((todo) =>
  res.format({
    html: () => {
      res.render("put_todos",
      {
          title : "NodeExpress",
          name: todo['name'],
          completion: todo['completion'],
          id: todo['id'],
          created_at: todo['created_at'],
          updated_at: todo['updated_at']
      })
    },
    json: () => {
      res.json("Todo updated with success ! ")
    }
  }))

  .catch((err) => {
    return res.status(404).send(err)
  })
})

router.delete('/:id', (req, res) => {
  if (!req.params.id) return res.status(404).send('NOT FOUND')
  Todos.delete(req.params.id)
  .then(() =>
  res.format({
    html: () => {
      res.render("delete_todos",
      {
          title : "NodeExpress"
      })
    },
    json: () => {
      res.json("Todo deleted with success ! ")
    }
  }))

  .catch((err) => {
    return res.status(404).send(err)
  })
})


router.use((err, req, res, next) => {
  res.format({
    html: () => {
      console.log("error : " + err)
      res.render("error404", {
        error: err
      })
    },
    json: () => {
      console.log("error : " + err)
      res.json({
        message: "Error 500",
        description: "Server Error"
      })
    }
  })
})

module.exports = router
