const fs = require('fs');

module.exports = (path) => {
    return new Promise(function(resolve, reject) {
        fs.readFile(path, function (err, data) {
            if(!err) {
                let lines = data.toString().split('\n').length;
                resolve(lines);
            }
            reject(err);
        });
    });
}