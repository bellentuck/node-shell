var exports = module.exports = {};

exports.pwd = function (stdin, args, done) {
  done(process.cwd());  //or, process.mainModule.filename
}

exports.date = function (stdin, args, done) {
  done(Date()); //i.e., new Date().toString()
}

exports.ls = function (stdin, args, done) {
  fs.readdir('.', function (err, files) {
    if (err) throw err;
    done(files.join('\n'));
  });
}

exports.echo = function(stdin, args, done) {
  const output = args
    .split(' ')
    .map(arg => {
      return arg[0] === '$' ? process.env[arg.slice(1)] : arg;
    })
    .join(' ');
  done(output);
}
