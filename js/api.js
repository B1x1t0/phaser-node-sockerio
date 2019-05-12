
module.exports = function(app){
  console.log('Resolve application');

  app.get('/api/todo', (req, res) => {
    res.status(200).send({
      success: 'OK',
      message: '',
      todos: db
    })
  });

  app.post('/api/todo', (req, res) => {
    if (!req.body.title) {
      return res.status(400).send({
        success: 'error',
        message: 'title is required'
      });
    } else if (!req.body.description) {
      return res.status(400).send({
        success: 'error',
        message: 'description is required'
      });
    }
    const todo = {
      id: db.length + 1,
      title: req.body.title,
      description: req.body.description
    }
    db.push(todo);
    return res.status(201).send({
      success: 'OK',
      message: '',
      todo
    })
  });

  app.get('/api/todo/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    db.map((todo) => {
      if (todo.id === id) {
        return res.status(200).send({
          success: 'OK',
          message: '',
          todo,
        });
      }
    });
    return res.status(404).send({
      success: 'error',
      message: 'todo doesnt exist',
    });
  });

  app.delete('/api/todo/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);

    db.map((todo, index) => {
      if (todo.id === id) {
        db.splice(index, 1);
        return res.status(200).send({
          success: 'ok',
          message: 'deleted successfuly',
        });
      }
    });


    return res.status(404).send({
      success: 'error',
      message: 'todo not found',
    });
  });

  app.put('/api/todo/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    let todoFound;
    let itemIndex;
    db.map((todo, index) => {
      if (todo.id === id) {
        todoFound = todo;
        itemIndex = index;
      }
    });

    if (!todoFound) {
      return res.status(404).send({
        success: 'error',
        message: 'todo not found',
      });
    }

    if (!req.body.title) {
      return res.status(400).send({
        success: 'error',
        message: 'title is required',
      });
    } else if (!req.body.description) {
      return res.status(400).send({
        success: 'error',
        message: 'description is required',
      });
    }

    const updatedTodo = {
      id: todoFound.id,
      title: req.body.title || todoFound.title,
      description: req.body.description || todoFound.description,
    };

    db.splice(itemIndex, 1, updatedTodo);

    return res.status(201).send({
      success: 'ok',
      message: 'todo added successfully',
      updatedTodo,
    });
  });
}