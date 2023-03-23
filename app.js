const express = require('express');
const app = express();
const port = 3000;
const mysql = require('mysql2');
const registerRoutes = require('./routes/register');
const loginRoutes = require('./routes/login');
const homeRoutes = require('./routes/home');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));


// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodeapps'
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database.');
});

app.use(express.static('public'));

app.use('/', homeRoutes);
app.use('/', loginRoutes);
app.use('/', registerRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
