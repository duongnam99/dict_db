var fs = require('fs');
var utils = require('./libs/utils');
var mongoose = require('mongoose');

var inName = process.argv[2];
var dbName = process.argv[3];
var coName = process.argv[4];

// input
var input = fs.createReadStream('./stardict/' + inName);

// mongoose
mongoose.connect('mongodb://localhost/' + dbName);
var wordSchema = mongoose.Schema({
  index: Number,
  key: String,
  trait: Array,
  type: String,
  meaning : Array
});
var Word = mongoose.model(coName, wordSchema);

// utils
utils.getWords(input, function(word){
  var newWord = new Word({
    index : word.index,
    key : word.key,
    trait: word.trait,
    type: word.type,
    meaning : word.meaning
  });

  newWord.save(function(err, res){
    if(err) console.log('Database error');
    else console.log(res);
  });
});
