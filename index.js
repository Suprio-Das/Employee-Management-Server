const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const PORT = process.env.PORT || 5000;

// Creating Express App
const app = express();

// Middlewares
app.use(express());
app.use(cors());

// Testing Route
app.get('/', (req, res) => {
    res.send('Hola, Server is running!');
});

// MongoDB Setup
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.63zdo.mongodb.net/?appName=Cluster0`;
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        // Getting The DB
        const database = client.db('EmployeeManagement');
        const adminCollection = database.collection('admins');
        const employeesCollection = database.collection('employees');

        // admin routes starts------------------------------------------

        // Logged-in admin
        app.get('/admins', async (req, res) => {
            const email = req.body.email;
            const result = await adminCollection.findOne(email);
            res.send(result);
        })

        // admin routes ends---------------------------------------------
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.listen(PORT);