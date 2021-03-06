const fs = require('fs');
const path = require('path');
const sh = require('shelljs');

const readFile = file =>
  new Promise((resolve, reject) => {
    fs.readFile(path.resolve(file), 'utf8', (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });

const readJSON = file => readFile(file).then(JSON.parse);

const gitAdd = (content, file, message) => {
  sh.ShellString(content).toEnd(file);
  sh.exec(`git add ${file}`);
  sh.exec(`git commit -m "${message}"`);
};

module.exports = {
  readFile,
  readJSON,
  gitAdd
};
