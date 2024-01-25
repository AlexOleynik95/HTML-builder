const fsPromises = require('node:fs/promises');
const path = require('node:path');

const dirPath = path.join(__dirname, 'secret-folder');

(async function () {
  try {
    const files = await fsPromises.readdir(
      dirPath,
      {withFileTypes: true}
    );
  
    for (const file of files) {
      if (file.isDirectory()) {continue}
      const filePath = path.parse(file.name);
      const fileStats = await fsPromises.stat(
        path.join(dirPath, file.name)
      );
      console.log(
        filePath.name
        + ' - ' + filePath.ext.slice(1)
        + ' - ' + (fileStats.size / 1024).toFixed(3) + ' KB'
      );
    }
  } catch (err) {
    console.log(err);
  }
})();