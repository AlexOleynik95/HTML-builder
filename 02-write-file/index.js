const fs = require('node:fs');
const path = require('node:path');
const process = require('node:process');
const readline = require("node:readline");

const textPath = path.join(__dirname, 'text.txt');
const writeStream = fs.createWriteStream(
  textPath,
  {encoding: 'utf8'}
);
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


console.log(`*** Running 02-write-file script ***
Please write your text to be stored in text.txt
Or press Ctrl + C / type 'exit' to terminate this script
`);

function requestInput() {
  rl.question('Your text: ', (text) => {
    if (text === 'exit') {
      terminate();
    }
    writeStream.write(text + '\n' + '\n');
    requestInput();
  });

}

rl.on('SIGINT', terminate);

function terminate() {
  rl.write('*** Script terminated ***');
  process.exit(1);
}

requestInput();