// console.log(Object.keys(process))

const commands = require('./commands');

// Output a prompt
process.stdout.write(`prompt > `);

// The stdin 'data' event fires after a user types in a line

process.stdin.on('data', function(data) {
  const cmd = data.toString().trim(); // remove newline

  commands.pwd(cmd);
  commands.date(cmd);
  commands.ls(cmd);
  commands.echo(cmd);
  commands.cat(cmd);
  commands.head(cmd);
  commands.tail(cmd);
  commands.sort(cmd);
  commands.wc(cmd);
  commands.uniq(cmd);
});


