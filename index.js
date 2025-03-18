const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const PORT = process.env.PORT || 5000;

// Creating Express App
const app = express();

// Middlewares
app.use(express.json());
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
        app.get('/admins/:email', async (req, res) => {
            const email = req.params.email;
            const query = { email: email };
            const result = await adminCollection.findOne(query);
            res.send(result);
        })

        // update logged-in admin info
        app.put('/admins/:email', async (req, res) => {
            const email = req.params.email;
            const filter = { email: email };
            const data = req.body;
            console.log(data);
            const updatedAdmin = {
                $set: {
                    name: req.body.name,
                    designation: req.body.designation,
                    phone: req.body.phone,
                    photo: req.body.photo
                }
            }

            const result = await adminCollection.updateOne(filter, updatedAdmin);
            res.send(result);
        })

        // admin routes ends---------------------------------------------

        // employee routes starts----------------------------------------

        app.post('/employees', async (req, res) => {
            const data = req.body;
            const result = await employeesCollection.insertOne(data);
            res.send(result);
        })

        // employee routes ends------------------------------------------
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);


app.listen(PORT);