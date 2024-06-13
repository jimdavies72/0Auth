const TODO = require('./todoModel');

exports.createTodo = async (req, res) => {
  try {
    const newTodo = await TODO.create({
      userid: req.body.userid,
      title: req.body.title,
    });
    res.status(201).send({ data: newTodo });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

exports.getTodos = async (req, res) => {
  try {
    const todos = await TODO.find({userid: req.body.userid});
    console.log("rb: ", req.user);
    res.status(200).send({ data: todos });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

exports.updateTodo = async (req, res) => {
  try {
    const updatedTodo = await TODO.findByIdAndUpdate(
      req.body.id,
      req.body.data,
      { new: true }
    )
    res.status(200).send({ data: updatedTodo });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }  
}

exports.deleteTodos = async (req, res) => {
  try {
    const deletedTodos = await TODO.deleteMany(
      { 
        userid: req.body.userid, 
        completed: true 
      },
    );
    res.status(200).send({ deletedTodos });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}