const QuickEncrypt = require('quick-encrypt')
const crypto = require('crypto');
 
// --- RSA Keypair Generation ---
let keys = QuickEncrypt.generate(1024) // Use either 2048 bits or 1024 bits.
console.log(keys) // Generated Public Key and Private Key pair
let publicKey = keys.public      // " -----BEGIN RSA PUBLIC KEY-----\nMIGJAoGBAIXlXZs+0FoIGBc5pjnZZxtvIzdDFtNi3SVi6vf2J...... "
let privateKey = keys.private   // " -----BEGIN RSA PUBLIC KEY-----\nMIGJAoGBAIXlXZs+0FoIGBc5pjnZZxtvIzdDFtNi3SVi6vf2J...... "
 
// --- Encrypt using public key ---
let encryptedText = QuickEncrypt.encrypt('ImeanIt', publicKey )
console.log(encryptedText) // This will print out the ENCRYPTED text, for example : " 01c066e00c660aabadfc320621d9c3ac25ccf2e4c29e8bf4c...... "
 
// --- Decrypt using private key ---
let decryptedText = QuickEncrypt.decrypt( encryptedText, privateKey)
console.log(decryptedText) // This will print out the DECRYPTED text, which is " This is some super top secret text! "

const signer = crypto.createSign('RSA-SHA512');
signer.update('Imeanit');
const signature = signer.sign(privateKey, 'hex');
console.log('Signed with Private key :', signature);

console.log('Verifying...');

const verifier = crypto.createVerify('RSA-SHA512');
const publicKeyBuf = new Buffer(publicKey, 'utf-8');
const signatureBuf = new Buffer(signature, 'hex');
const result = verifier.verify(publicKeyBuf, signatureBuf);
console.log('Output :', result);