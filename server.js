
const express = require('express');
// we'll use morgan to log the HTTP layer
const morgan = require('morgan');
// we'll use body-parser's json() method to 
// parse JSON data sent in requests to this app
const bodyParser = require('body-parser');

// we import the ShoppingList model, which we'll
// interact with in our GET endpoint
const {ShoppingList} = require('./models');
//Question, why is this called almost like a class with the . ?

const jsonParser = bodyParser.json();
const app = express();

// log the http layer
app.use(morgan('common'));

// we're going to add some items to ShoppingList
// so there's some data to look at. Note that 
// normally you wouldn't do this. Usually your
// server will simply expose the state of the
// underlying database.
ShoppingList.create('beans', 2);
ShoppingList.create('tomatoes', 3);
ShoppingList.create('peppers', 4);
ShoppingList.create('wine', 10);

//add a couple recipes to the model
//first we must require the recipe model
const {Recipes} = require('./models');
//then we create a few recipes
Recipes.create('chocolate milk', ['cocoa','milk','sugar' ]);
Recipes.create('Sweet Tea Lemonade', ['water', 'sugar', 
'black tea', 'lemons']);

//then we create the request and response for the recipes
app.get('/recipes', (req,res)=>{
  res.json(Recipes.get());
});



// when the root of this route is called with GET, return
// all current ShoppingList items by calling `ShoppingList.get()`
app.get('/shopping-list', (req, res) => {
  res.json(ShoppingList.get());
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Your app is listening on port ${process.env.PORT || 8080}`);
});
