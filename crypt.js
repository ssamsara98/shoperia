const crypto = require('crypto');

const randomBytes = crypto.randomBytes(32);
console.log(randomBytes);
const token = randomBytes.toString('hex');
console.log(token);

const hash = crypto.createHash('sha256').update(token).digest('hex');
console.log(hash);
