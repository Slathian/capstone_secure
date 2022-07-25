const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const uuid = require('uuid');
const sha256 = require('js-sha256');

port = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

//Configs

const db = mysql.createConnection({
    host: 'REMOVED FOR SECURITY REASONS',
    user: 'REMOVED FOR SECURITY REASONS',
    password: 'REMOVED FOR SECURITY REASONS',
    database: 'portfolioData'
});


//God this was a pain to learn. Works now though. I hope.
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); // Remember to change this to the domain when I push it to production ~~~
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});


let globalAPIKey = '';


//Blog routes

app.get(`/api/call-all-test`, (req, res) => {
  db.query(`SELECT * FROM test`, (err, rows) => {
      if (err) {
          console.log(err);
          res.sendStatus(500);
      } else {
          res.json(rows);
      }
    }
  )
});

app.get(`/api/call-all-blogs`, (req, res) => {
  db.query(`SELECT * FROM blogs`, (err, rows) => {
      if (err) {
          console.log(err);
          res.sendStatus(500);
      } else {
          res.json(rows);
      }
    }
  )
});

app.get(`/api/call-all-users`, (req, res) => {
  db.query(`SELECT usersID, usersName FROM users`, (err, rows) => {
      if (err) {
          console.log(err);
          res.sendStatus(500);
      } else {
          res.json(rows);
      }
    }
  )
});

app.put(`/api/blogpost-update/:id`, (req, res) => {
  const id = req.params.id;
  // console.log(`WE HAVE BEEN PINGED`);
  // let id = 20;
  const blogsTitle = req.body.blogsTitle;
  const blogsSummary = req.body.blogsSummary;
  const blogsBody = req.body.blogsBody;
  const authUID = req.body.authUID;

  if (authUID === (sha256(`${globalAPIKey}verifiedPassword`))) {
  console.log(`${blogsTitle} ${blogsSummary} ${blogsBody}`);
  db.query(`UPDATE blogs SET blogsTitle = '${blogsTitle}', blogsSummary = '${blogsSummary}', blogsBody = '${blogsBody}' WHERE blogsID = ${id}`), (err, rows) => {
      if (err) {
          console.log(err);
      } else {
          res.sendStatus(200);
      }
    }

  res.sendStatus(200);

  } else {
    res.sendStatus(403);
  }
});
  


//Obsolete in production ~~~

// app.post('/api/insert', (req, res) => {

//   const testSTRING = req.body.testSTRING;
//   const testUSER = req.body.testUSER;

//   const sqlInsert = "INSERT INTO test (testSTRING, testUSER) VALUES (?,?)";
//   db.query(sqlInsert, [testSTRING, testUSER], (err, result) => {
//       console.log(result);
//   });
//   res.sendStatus(200);
// });

app.get('/api/blogpost/:id', (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM blogs WHERE blogsID = ${id}`;
  db.query(sql, (err, rows) => {   
  if (err) {
    console.log(err); 
    res.sendStatus(500);
  } else {
    res.json(rows);
  }})
})

app.get('/api/pull-all-blogs', (req, res) => {
  db.query(`SELECT * FROM blogs`, (err, rows) => {
      if (err) {
          console.log(err);
          res.sendStatus(500);
      } else {
          res.json(rows);
      }
    }
  )
});

app.post ('/api/insert-blog', (req, res) => {
  const blogsTitle = req.body.blogsTitle;
  const blogsBody = req.body.blogsBody;
  const blogsSummary = req.body.blogsSummary;

  console.log(blogsTitle, blogsBody, blogsSummary);
  
  db.query(`INSERT INTO blogs (blogsTitle, blogsBody, blogsSummary, blogsDate) VALUES ("${blogsTitle}","${blogsBody}","${blogsSummary}", CURTIME())`, (err, result) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.sendStatus(200);
    }
  })
});

app.delete ('/api/delete-blog/:id', (req, res) => {
  const blogsID = req.params.id
  const data = blogsID.split("-");
  if (data[1] === sha256(`${globalAPIKey}verifiedPassword`)) {
    const sql = `DELETE FROM blogs WHERE blogsID = ${data[0]}`
    db.query(sql, (err, result) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
      } else {
        res.sendStatus(200);
      }
    })
  }
  else {
    res.sendStatus(401);
  }
})

// Login handlers



app.post('/api/login', (req, res) => {
  res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
  // get users credentials from the JSON body
  const { username, password } = req.body
  console.log(username, password);

  db.query(`SELECT * FROM users WHERE usersName = '${username}' AND usersHashedPass = '${password}'`, (err, rows) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      if (rows.length === 0) {
        res.sendStatus(401);
      } else {
        const APIKey = uuid.v4()
        res.send(sha256(`${APIKey}verifiedPassword`));
        globalAPIKey = APIKey
      }
    }
  });
});

app.post('/api/authCheck', (req, res) => {
  res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
  console.log(req.body);
  if (req.body.authUID === `${sha256(`${globalAPIKey}verifiedPassword`)}`) {
    // res.sendStatus(200);
    res.send('True')
  } else {
    // res.sendStatus(401);
    res.send('False');
  }
});


  // if (!username) {
  //     // If the username isn't present, return an HTTP unauthorized code
  //     res.status(401).end()
  //     return
  // }

  // // validate the password against our data
  // // if invalid, send an unauthorized code
  // const expectedPassword = users[username]
  // if (!expectedPassword || expectedPassword !== password) {
  //     res.status(401).end()
  //     return
  // }


// Listening Port

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
