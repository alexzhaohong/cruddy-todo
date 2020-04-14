
// Todo Model //////////////////////////////////////////////////////////////////

const Todo = require('./datastore');

// Configure Express ///////////////////////////////////////////////////////////

const bodyParser = require('body-parser');
const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, './public')));

// RESTful Routes for CRUD operations //////////////////////////////////////////

// Create (Crud) -- collection route
app.post('/todo', (req, res) => {
  // this post request passes in a (request obj, results obj) =>
  // creates the todo, passes in (text of the request obj) and a function
  // this function handles errors (400) and successes (201) and json object of a new todo
  Todo.create(req.body.todoText, (err, newTodo) => {
    if (err) {
      res.sendStatus(400);
    } else {
      // send back json object w/ newTodo
      res.status(201).json(newTodo);
    }
  });
});

// Read all (cRud) -- collection route
app.get('/todo', (req, res) => {
  Todo.readAll((err, todos) => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.status(200).json(todos);
    }
  });
});

// Read one (cRud) -- member route
app.get('/todo/:id', (req, res) => {
  Todo.readOne(req.params.id, (err, todo) => {
    if (todo) {
      res.status(200).json(todo);
    } else {
      res.sendStatus(404);
    }
  });
});

// Update (crUd) -- member route
app.put('/todo/:id', (req, res) => {
  Todo.update(req.params.id, req.body.todoText, (err, todo) => {
    if (todo) {
      res.status(200).json(todo);
    } else {
      res.sendStatus(404);
    }
  });
});

// Delete (cruD) -- member route
app.delete('/todo/:id', (req, res) => {
  Todo.delete(req.params.id, (err) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  });
});

// Start & Initialize Web Server ///////////////////////////////////////////////

const port = 3000;
app.listen(port, () => {
  console.log('CRUDdy Todo server is running in the terminal');
  console.log(`To get started, visit: http://localhost:${port}`);
});

Todo.initialize();
