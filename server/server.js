var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var urlServer = 'http://localhost:5000';

var app = express();

// Datasource
var players = [
  {id: 1, firstname: 'Michel', lastname: 'Platini', team: 'Juventus', photo: urlServer + '/img/platini.jpg'},
  {id: 2, firstname: 'Pavel', lastname: 'Nedved', team: '', photo: ''},
  {id: 3, firstname: 'Thomas', lastname: 'Meunier', team: 'PSG', photo: ''},
];

var teams = [
  {id: 1, name: 'PSG', country: 'France'},
  {id: 2, name: 'Juventus', country: 'Italie'},
  {id: 3, name: 'Real Madrid', country: 'Espagne'},
]

// Middlewares
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "PUT, DELETE");
  next();
});

// Api
app.get('/players', (req, res) => res.json(players));

app.get('/players/:lastname', (req, res) => {
  let lastname = req.params.lastname;
  res.json(players.filter(player => player.lastname == lastname)[0]);
});

app.post('/players', function(req, res) {
  var id = getLastId(players);

  var player = {
    id: id + 1, // incrémentation de l'id
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    team: req.body.team,
    photo: req.body.photo
  };
  // ajout du player dans le tableau
  players.push(player);
  console.log(player);
  res.json(player);
});

// app.put('/books/:id', function(req, res) {
//   var id = parseInt(req.params.id);
//   var newBook = {
//     id: id,
//     title: req.body.title,
//     author: req.body.author,
//     year: parseInt(req.body.year),
//     available: req.body.available
//   };
//   for(var i=0; i<books.length; i++) {
//     if (id === books[i].id) {
//       books[i] = newBook;
//       break;
//     }
//   }
//   res.json(newBook);
// });

// app.delete('/players/:lastname', function(req, res) {
//   var id = parseInt(req.params.id);
//   for(var i=0; i<books.length; i++) {
//     if (id === books[i].id) {
//       books.splice(i, 1);
//       break;
//     }
//   }
//   res.json({id:id});
// });

app.get('/teams', (req, res) => res.json(teams));

app.listen(5000, () => console.log('Serveur écoute le port 5000...'));

// Helpers
function getLastId(array) {
  var maxId = 0;
  for(var i=0; i<array.length; i++)
    if (array[i].id > maxId) maxId = array[i].id;
  return maxId;
}
