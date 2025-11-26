// Create a new router
const express = require("express")
const router = express.Router()

const redirectLogin = (req, res, next) => {
    if (!req.session.userId ) {
      res.redirect('./login') // redirect to the login page
    } else { 
        next (); // move to the next middleware function
    } 
}


router.get('/register', function (req, res, next) {
    res.render('register.ejs')
})

const saltRounds = 10

router.post('/registered', function (req, res, next) {
const bcrypt = require('bcrypt')
 const plainPassword = req.body.password
bcrypt.hash(plainPassword, saltRounds, function(err, hashedPassword){

  // Store hashed password in your database.
  let sqlquery = "INSERT INTO users (username, password) VALUES (?,?)"
  // execute sql query
    let newrecord = [req.body.username, req.body.password]
    db.query(sqlquery, newrecord, (err, result) => {
        if (err) {
            next(err)
        }
        else
            result = 'Hello '+ req.body.first + ' '+ req.body.last +' you are now registered!  We will send an email to you at ' + req.body.email
            result += 'Your password is: '+ req.body.password +' and your hashed password is: '+ hashedPassword
    res.send(result)})
    })
})

app.get('/list', redirectLogin, function (req, res) {
router.get('/listusers', function(req, res, next) {
        let sqlquery = "SELECT * FROM users"; // query database to get all the users
        // execute sql query
        db.query(sqlquery, (err, result) => {
            if (err) {
                next(err)
            }
            res.render("listusers.ejs", {availableUsers:result})
         });
    });

    router.get('/login', function (req, res, next) {
    res.render('login.ejs')
})
     })


router.post('/loggedin', function (req, res, next) {
const bcrypt = require('bcrypt')
// Save user session here, when login is successful
req.session.userId = req.body.username;
 const plainPassword = req.body.password
    // Compare the password supplied with the password in the database
    bcrypt.compare(req.body.password, hashedPassword, function(err, result) {
      if (err) {
        // TODO: Handle error
      }
      else if (result == true) {
        // TODO: Send message
      }
      else {
        // TODO: Send message
      }
    })
})

// router.get('/audit', function (req, res, next) {
//     res.render('audit.env')
// })

// Export the router object so index.js can access it
module.exports = router
