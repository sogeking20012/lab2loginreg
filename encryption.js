// Define encryption function
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
  
  // Define decryption function
  function decrypt(text, shift) {
    return encrypt(text, (26 - shift) % 26);
  }
  