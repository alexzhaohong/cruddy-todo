/* eslint-disable func-style */
const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0);
    } else {
      callback(null, Number(fileData));
    }
  });
};


const writeCounter = (count, callback) => {
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

// Goal: save id counter to client/hard drive
// Make use of readCounter & writeCounter
exports.getNextUniqueId = (nextCallback) => {
  // reading it -> increment it -> write it -> put counter in nextCallback
  readCounter((err, data) => {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log('-1 check: ' + data);
      console.log(data + 1);
      writeCounter(data + 1, (err, data) => (
        nextCallback(err, data)
      ));
    }
  });


  // readCounter((err, data) => { writeCounter(data + 1, nextCallback); });


  // counter = counter + 1;
  // return zeroPaddedNumber(counter);
};


// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

//counterFile = string that points to somewhere in your file system

exports.counterFile = path.join(__dirname, 'counter.txt');

