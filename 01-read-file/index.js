const fs = require('node:fs');
const path = require('node:path');
const textPath = path.join(__dirname, 'text.txt');

async function readFile(stream) {
  for await (let chunk of stream) {
    console.log(chunk);
  }
}

const readStream = fs.createReadStream(
  textPath,
  {encoding: 'utf8'},
);

readFile(readStream);