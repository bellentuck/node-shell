'use strict';

const fs = require('fs');
const request = require('request');

var exports = module.exports = {};

exports.cat = function(stdin, filenames, done) {
  if (stdin && !filenames) return done(stdin);
  const data = [];
  let counter = 0;
  filenames.split(' ').forEach((filename, index) => {
    fs.readFile(filename, 'utf8', function (err, contents) {
      if (err) throw err;
      data[index] = contents;
      counter++;
      if (counter === data.length) done(data.join('\n'));
    });
  });
}

function processFile(stdin, filename, done, callback) {
  if (stdin && !filename) produceOutput(null, stdin);
  else fs.readFile(filename, 'utf8', produceOutput);
  function produceOutput (err, text) {
    if (err) throw err;
    done(callback(text));
  }
}

exports.head = function(stdin, filename, done) {
  processFile(
    stdin,
    filename,
    done,
    text => text.split('\n').slice(0,5).join('\n')
  );
}

exports.tail = function(stdin, filename, done) {
  processFile(
    stdin,
    filename,
    done,
    text => text.split('\n').slice(-5).join('\n')
  );
}

exports.sort = function(stdin, filename, done) {
  processFile(
    stdin,
    filename,
    done,
    text => text.split('\n').sort().join('\n')
  );
}

exports.wc = function(stdin, filename, done) {
  processFile(
    stdin,
    filename,
    done,
    text => text.split('\n').length
  );
}

exports.uniq = function(stdin, filename, done) {
  processFile(
    stdin,
    filename,
    done,
    text => {
      const lines = text.split('\n');
      for (let i = 0; i < lines.length; i++) {
        if (lines[i] === lines[i + 1]) {
          lines.splice(i, 1);
          i--;
        }
      }
      return lines.join('\n');
    }
  );
}

exports.curl = function(stdin, url, done) {
  // currently only supports http (not https)
  if (stdin && !filename) return produceOutput(null, {statusCode: 200}, stdin);
  if (url.slice(0, 7) !== 'http://') url = 'http://' + url;
  request(url, produceOutput);

  function produceOutput(err, response, body) {
    if (err) throw err;
    else if (response && (response.statusCode > 399)) throw new Error(response, statusCode);
    if (body) done(body);
    else done('');
  }
}




// exports.sort = function(cmd) {
//   let args = cmd.split(' ');
//   if (args[0] === 'sort') {
//     fs.readFile(args[1], 'utf8', function (err, contents) {
//       if (err) throw err;
//       let contentsArr = contents.split('\n').map(line => {
//         let containsCharacter = /[a-z]/i.exec(line);
//         if (containsCharacter) line = line.slice(containsCharacter.index);
//         return line;
//       });

//       process.stdout.write(contentsArr.sort(
//         (a,b) => a.toLowerCase() > b.toLowerCase()
//       ).join('\n') + '\n');
//       process.stdout.write(`prompt > `);
//     });
//   }
// }
// exports.wc = function(){}
// exports.uniq = function(){}
