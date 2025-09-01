const urlRoutes = require('./routes/urlRoutes');
const {mongoConnect} = require('./config/databaseConnectivity');
const express = require('express');

const app = express();
app.use(express.json());

app.use('/',urlRoutes);

const PORT = process.env.PORT;
app.listen(PORT, async() => {
    await mongoConnect();
    console.log(`Server is listening on http://localhost:${PORT}`);
});