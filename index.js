require("dotenv").config();
const express = require("express");
const cors = require('cors')
const Producto = require("./models/producto");
const usersRouter = require('./controllers/users')
const productosRouter = require('./controllers/productos')
const loginRouter = require('./controllers/login')
const User = require('./models/user')


const app = express();

//middleware
app.use(express.json());
app.use(cors())

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

app.use(requestLogger);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

// este debe ser el último middleware cargado, ¡también todas las rutas deben ser registrada antes que esto!
app.use(errorHandler);

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.use('/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/products', productosRouter)


const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
