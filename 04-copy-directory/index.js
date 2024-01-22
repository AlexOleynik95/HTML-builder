const fs = require('node:fs/promises');
const {mkdir, readdir, copyFile} = require('node:fs/promises');
const path = require('node:path');

const dirPath = path.join(__dirname, 'files');
const copyDirPath = path.join(__dirname, 'files-copy');


(async function makeDir() {
  const dirPromise = await mkdir(
    copyDirPath,
    {recursive: true}
  );
  return dirPromise;
})();

try {
  readdir(
    dirPath
  ).then(async function copyFiles(files) {
    for (const file of files) {
      await copyFile(
        path.join(dirPath, file),
        path.join(copyDirPath, file)
      );
      console.log(`file ${file} copied!`);
    }
  });
} catch (err) {
  console.log(err);
}