# Todolist

Interface permettant d'ajouter des utilisateurs (tables :  firstname, lastname, username, password, email, createdAt, updatedAt) et des todos (tables : message, completion, updatedAt, createdAt, userId)

## Modules

```python
"bcrypt": "^3.0.2",
    "bcryptjs": "^2.4.3",
    "body-parser": "^1.18.3",
    "dateformat": "^3.0.3",
    "express": "^4.16.4",
    "handlebars.moment": "^1.0.4",
    "hbs": "^4.0.1",
    "lodash": "^4.17.11",
    "method-override": "^3.0.0",
    "moment": "^2.23.0",
    "sqlite": "^3.0.0"
```
## Installation

```bash
npm install
```

## Consigne
Un crud doit être implémenté pour chacunes de ces ressources: 
  - GET /ressources: 
    - JSON: Renvoi le contenus de la requêtes sql
    - HTML: affiche la page index.tpl
  - GET /ressources/:id
    - JSON: Renvoi le contenus de la requêtes sql
    - HTML: affiche la page show.tpl
  - POST /ressources
    - JSON: {message : 'sucess'}
    - HTML: redirect sur index.tpl
  - PUT/PATCH /ressources/:id
    - JSON: {message : 'sucess'}
    - HTML: redirect sur index.tpl
  - DELETE /ressources/:id
    - JSON: {message : 'sucess'}
    - HTML: redirect sur index.tpl
  - GET /ressources/add
    - HTML: afficher un formulaire
  - GET /ressources/:id/edit
    - HTML: afficher le même formulaire que pour /add
  - GET /users/:id/todos
    - JSON: renvoi les todos de l'utilisateur
    - HTML: affiche un tableau des todos de l'utilisateur


Un middleware de 404 sera necessaire pour toutes les requêtes qui n'arrive pas à destination: 
 - JSON: {status: 404 not found}
 - HTML: une page de 404 
