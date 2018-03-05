const fs = require('fs');

var exports = module.exports = {}

exports.pwd = function (cmd) {
  if (cmd === 'pwd') {
    process.stdout.write(process.mainModule.filename);
    process.stdout.write(`\nprompt > `);
  }
}

exports.date = function (cmd) {
  if (cmd === 'date') {
    process.stdout.write(new Date().toString());
    process.stdout.write(`\nprompt > `);
  }
}

exports.ls = function (cmd) {
  if (cmd === 'ls') {
    fs.readdir('.', function (err, files) {
      if (err) throw err;
      files.forEach(file => {
        process.stdout.write(file.toString() + '\n');
      });
      process.stdout.write(`prompt > `);
    });
  }
}

exports.echo = function(cmd) {
  let args = cmd.split(' ');
  if (args[0] === 'echo') {
    if (args[1][0] === '$') {
      var env = process.env[args[1].slice(1)];
      process.stdout.write(env + '\n');
    } else {
      process.stdout.write(args.slice(1).join(' ') + '\n');
    }
    process.stdout.write(`prompt > `);
  }
}

exports.cat = function(cmd) {
  let args = cmd.split(' ');
  if (args[0] === 'cat') {

    if (args.length > 2) {
      let data = args.slice(1);
      let counter = 0;

      data.forEach((filename, index) => {
        let thisIndex = index;

        fs.readFile(filename, 'utf8', function (err, contents) {
          if (err) throw err;

          data[thisIndex] = contents;
          counter++;

          if (counter === data.length) {
            process.stdout.write(data.join('\n'));
            process.stdout.write(`prompt > `);
          }

        });
      });
    }
    else {
      fs.readFile(args[1], 'utf8', function(err, contents) {
        if (err) throw err;
        process.stdout.write(contents);
        process.stdout.write(`prompt > `);
      });
    }
  }
}

exports.head = function(cmd, n = 5) {
  let args = cmd.split(' ');
  if (args[0] === 'head') {
    fs.readFile(args[1], 'utf8', function (err, contents) {
      if (err) throw err;
      process.stdout.write(contents.split('\n').slice(0,n).join('\n') + '\n');
      process.stdout.write(`prompt > `);
    });
  }
}

exports.tail = function(cmd, n = 5) {
  let args = cmd.split(' ');
  if (args[0] === 'tail') {
    fs.readFile(args[1], 'utf8', function (err, contents) {
      if (err) throw err;
      let contentsArr = contents.split('\n');
      process.stdout.write(contentsArr.slice(contentsArr.length - n).join('\n') + '\n');
      process.stdout.write(`prompt > `);
    });
  }
}

exports.sort = function(cmd) {
  let args = cmd.split(' ');
  if (args[0] === 'sort') {
    fs.readFile(args[1], 'utf8', function (err, contents) {
      if (err) throw err;
      let contentsArr = contents.split('\n').map(line => {
        let containsCharacter = /[a-z]/i.exec(line);
        if (containsCharacter) line = line.slice(containsCharacter.index);
        return line;
      });

      process.stdout.write(contentsArr.sort(
        (a,b) => a.toLowerCase() > b.toLowerCase()
      ).join('\n') + '\n');
      process.stdout.write(`prompt > `);
    });
  }
}
exports.wc = function(){}
exports.uniq = function(){}
