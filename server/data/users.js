const bcrypt = require('bcrypt');

const users = [
  {
    name: 'Samara Arata',
    email: 'samara98@mailsac.com',
    username: 'samara98',
    password: bcrypt.hashSync('pass1234', bcrypt.genSaltSync(12)),
    admin: true,
    avatar: 'img/avatar/default.webp',
    birthdate: '1998-12-29',
    sex_type: 'Male',
  },
];

module.exports = users;
