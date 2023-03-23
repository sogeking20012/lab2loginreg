const mysql = require('mysql2');
const validator = require('email-validator');

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'nodeapps'
});

exports.getRegisterPage = (req, res) => {
  res.render('register', { message: null });
};

exports.registerUser = (req, res) => {
  const { email, password, usertype } = req.body;

  // Check if password meets complexity requirements
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
  if (!passwordRegex.test(password)) {
    return res.render('register', { message: 'Password must be at least 8 characters long and contain at least one number, one lowercase letter, one uppercase letter, and one special character' });
  }

   // Check if email is valid
  //  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //  if (!emailRegex.test(email)) {
  //    return res.render('register', { message: 'Invalid email address' });
  //  }

  // Validate email address
  if (!validator.validate(email)) {
    return res.render('register', { message: 'Invalid email address' });
  }

  // Encrypt password using custom encryption function
  const encryptedPassword = encrypt(password,3);

  // Insert user into MySQL database
  const query = `INSERT INTO users (email, password, usertype) VALUES (?, ?, ?)`;
  connection.query(query, [email, encryptedPassword, usertype], (err, result) => {
    if (err) {
      console.error(err);
      res.render('register', { message: 'Error registering user' });
    } else {
      res.render('login', { message: 'User successfully registered' });
    }
  });
};

function encrypt(text, shift) {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    let char = text.charAt(i);
    // Check if character is a letter
    if (/[a-zA-Z]/.test(char)) {
      let code = text.charCodeAt(i);
      // Uppercase letters
      if (code >= 65 && code <= 90) {
        char = String.fromCharCode(((code - 65 + shift) % 26) + 65);
      }
      // Lowercase letters
      else if (code >= 97 && code <= 122) {
        char = String.fromCharCode(((code - 97 + shift) % 26) + 97);
      }
    }
    // Check if character is a number or special character
    else if (/[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(char)) {
      let code = text.charCodeAt(i);
      char = String.fromCharCode((code + shift) % 128);
    }
    result += char;
  }
  return result;
}
