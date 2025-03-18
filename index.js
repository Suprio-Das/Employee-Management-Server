const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

// Creating Express App
const app = express();

// Middlewares
app.use(express());
app.use(cors());

// Testing Route
app.get('/', (req, res) => {
    res.send('Hola, Server is running!');
})

app.listen(PORT);