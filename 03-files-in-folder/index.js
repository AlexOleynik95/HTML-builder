const fs = require('node:fs');
const {readdir} = require('node:fs/promises');
const path = require('node:path');

const dirPath = path.join(__dirname, 'secret-folder');


try {
  readdir(
    dirPath,
    {withFileTypes: true}
  ).then(function showFiles(files) {
    for (const file of files) {
      if (file.isDirectory()) {continue}
      let pathObj = path.parse(file.name);
      console.log(
        pathObj.name
        + ' - ' + pathObj.ext.slice(1)
        + ' - ' + getSize(path.join(dirPath, file.name))
      );
    }
  });
} catch (err) {
  console.log(err);
}

function getSize(filePath) {
  fs.stat(filePath, (err, stats) => {
    if (err) {
      console.log(err);
    } else {
      console.log(`${(stats.size / 1024).toFixed(3)} KB`);
    }
  });
}