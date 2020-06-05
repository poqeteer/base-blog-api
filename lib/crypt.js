const crypto = require("crypto");
const algorithm = "aes-256-cbc";
const key = Buffer.from("5fab4c781a7dba47d5bbe1ac918ec61d", "binary");

module.exports.decrypt = function (text) {
  let iv = Buffer.from(text.iv, "hex");
  let encryptedText = Buffer.from(text.encryptedData, "hex");

  // Creating Decipher
  let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);

  // Updating encrypted text
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  // returns data after decryption
  return decrypted.toString();
};
