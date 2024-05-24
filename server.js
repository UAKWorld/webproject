const express = require("express");
const expressSession = require('express-session');
const expressVisitorCounter = require('express-visitor-counter');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const path = require("path");
const querystring = require('querystring');



(async () => {
  // Create a connection to the database
  const connection =await  mysql.createConnection({
    host: 'database-1.c9ugu6eagfu7.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'LkJO9cNX6Aj6ZhFEoUcC',
    database: 'registration_db'
  });

  
  const app = express();
  app.use(express.static(path.join(__dirname, "public")));

  // Middleware to parse form data
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  app.enable('trust proxy');
  app.use(expressSession({ secret: 'secret', resave: false, saveUninitialized: true }));

  

  // Middleware to update visitor count
  app.use(async (req, res, next) => {
    // Check if the user is new or returning
    if (!req.session.visited) {
      req.session.visited = true;
      // Increment the visitor count in the   
      await connection.query('INSERT INTO visitor_count (count) VALUES (1)');
    }

    next();
  });

  app.get("/getvistorcount", async (req, res) => {
    const [rows] = await connection.execute('SELECT COUNT(*) as count FROM visitor_count');
    const usersCount = rows[0].count;
    res.json({ usersCount });
  });


  app.get("/", async (req, res) => {
   
    res.sendFile(path.join(__dirname + "/home.html"));
  });
  
  app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname + "/About.html"));
  });
  
  app.get("/activities", (req, res) => {
    res.sendFile(path.join(__dirname + "/Activities.html"));
  });
  
  app.get("/modules", (req, res) => {
    res.sendFile(path.join(__dirname + "/Modules.html"));
  });
  
  app.get("/registration", (req, res) => {
    res.sendFile(path.join(__dirname + "/Registration.html"));
  });
  
  app.get("/info", (req, res) => {
    res.sendFile(path.join(__dirname + "/info.html"));
  });
  
  app.get("/view-form-data", (req, res) => {
    res.sendFile(path.join(__dirname + "/view-form.html"));
  });
  
  app.get("/get-form-data", async (req, res) => {
    const query = 'Select * From registration_info';

    try {
      const [result, fields] = await connection.execute(query);
      // Check if result is successful
        res.json(result);
    } catch (error) {
      console.error('Error fetching data:', error.stack);
      res.status(500).send('Error fetching data');
    }
  
  });
  
  
  app.post("/submitform", async (req, res) => {
  
    const { firstName, surname, mobileNumber, gender, password, comments } = querystring.parse(req.body.formDataString);
    const query = `INSERT INTO registration_info (first_name, surname, mobile_number, gender, user_password, comments) VALUES ('${firstName}', '${surname}', '${mobileNumber}', '${gender}', '${password}', '${comments}')`;
  
    try {
      const [result, fields] = await connection.execute(query);
      
      if (result.affectedRows > 0) {
        res.send('Form data inserted successfully!');
      } else {
        console.error('Error inserting data:', result.message);
        res.status(500).send('Error inserting data');
      }


    } catch (error) {
      console.error('Error inserting data:', error.stack);
      res.status(500).send('Error inserting data');
      return;
    }
  });
  
  
  const server = app.listen(process.env.PORT||3000);
  const portNumber = server.address().port;
  console.log(`port: ${portNumber}`);
  // can see the port number in terminal - you can dictate the port number
  
})();


