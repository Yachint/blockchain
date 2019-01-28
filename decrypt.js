const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');
const moveFile = require('move-file');

const getCipherkey =require('./getCipherKey');

function decrypt({file, password}){
    const readInitVect = fs.createReadStream(file, {end: 15});

    let initVect;
    readInitVect.on('data', (chunk) => {
        initVect = chunk;
    });

    readInitVect.on('close', () =>{
        const cipherKey = getCipherkey(password);
        const readStream = fs.createReadStream(file, {start : 16});
        const decipher = crypto.createDecipheriv('aes256', cipherKey, initVect);
        const unzip = zlib.createUnzip();
        const writeStream = fs.createWriteStream(file + '.pdf');
        var name = path.basename(file) + '.pdf';
        var n = name.indexOf('.enc');
        var final = name.slice(0, n);
        console.log(final);
        fs.renameSync(name,final);
        (async () => {
            await moveFile('./'+final, './Decrypted/'+final);
            console.log('File moved');
        })();
        
        
        

        readStream
            .pipe(decipher)
            .pipe(unzip)
            .pipe(writeStream);
    });
}

decrypt({file: './MyFile.pdf.enc', password :'ImeanIt'});
