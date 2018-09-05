let fs = require('fs');
let path = require('path');
let {
    localPathConfig
} = require('./config.js');
let localPath = path.join(...localPathConfig);

let filesTreeArr = [];

let filesTreeSync = (filePath) => {
    fs
        .readdirSync(filePath)
        .forEach((filename) => {
            let fileDir = filePath + path.sep + filename;
            let info = fs.statSync(fileDir)
            if (info.isFile()) {
                // console.log(fileDir)
                filesTreeArr.push(fileDir.split(path.sep).join('/'));
            } else if (info.isDirectory()) {
                filesTreeSync(fileDir);
            }
        })

    return filesTreeArr;
}

module.exports = filesTreeSync(localPath);