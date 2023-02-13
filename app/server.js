const express = require('express');
const TodoRoutes = require('./routes/todo.routes');

const app = express();
const PORT = 6000;

app.use(express.json());

app.use('/todo', TodoRoutes);

app.listen(PORT, () => {
  console.log(`Todo API running on http://localhost:${PORT}`);
});
