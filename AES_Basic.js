const crypto = require('crypto');
const getCipherKey = require('./getCipherKey')

// const fs = require('fs');
// const zlib = require('zlib');

// const readStream = fs.createReadStream('./test.pdf');
// const gzipStream = zlib.createGzip();
// const writeStream = fs.createWriteStream('./fd.pdf');

// readStream
//     .pipe(gzipStream)
//     .pipe(writeStream);

function encrypt(text, password){
    const initVect = crypto.randomBytes(16);
    const key = getCipherKey(password);

    const cipher = crypto.createCipheriv('aes256', key, initVect);
    const cipherText = cipher.update(text)

    console.log(initVect + cipherText);
    return initVect + cipherText;
}

encrypt('hello', 'mygr8password')