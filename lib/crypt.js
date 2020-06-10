const crypto = require("crypto");
const algorithm = "aes-256-cbc";
const key = Buffer.from(require("../config/key").key, "binary");

module.exports.decrypt = function (text) {
  try {
    let iv = Buffer.from(text.iv, "hex");
    let encryptedText = Buffer.from(text.encryptedData, "hex");

    // Creating Decipher
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);

    // Updating encrypted text
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    // returns data after decryption
    return decrypted.toString();
  } catch(e) {
    console.error("decrypt", e);
  }
};
