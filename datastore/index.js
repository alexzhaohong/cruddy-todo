const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  // 1. Get getNextUniqueId
  // 2. Create a new filepath with that fs.writeFile
  // 3. Put 'text' in that. (when POST request is made to the collection route)
  // 4.  Callback function
  //   callback(null, { id, text });

    // callback = the server's response to the ajax request from the client
  counter.getNextUniqueId((err, dataId) => {
    var dataDirUnique = path.join(exports.dataDir, `${dataId}.txt`);
    fs.writeFile(dataDirUnique, text, (err) => {
      if (err) {
        console.log('error writing counter');
        console.log(err);
        callback(err);
      } else {
        callback(null, { id: dataId, text: text });
      }
    });
  });

  // ORIGINAL VERSION
  // var id = counter.getNextUniqueId();
  // items[id] = text;
  // callback(null, { id, text });
};

exports.readAll = (callback) => {

  // . Read the dataDir
  //    for each file in the dataDir, get its path name -readFile
  // . Build a array of Files with id = pathname and text = pathname
  // . Return an array of Todos (GET request)


  // ORIGINAL VERSION
  var data = _.map(items, (text, id) => {
    return { id, text };
  });
  callback(null, data);
};

exports.readOne = (id, callback) => {
  var text = items[id];
  if (!text) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, { id, text });
  }
};

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
