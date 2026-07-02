const fs = require('fs');
const path = require('path');

// Belirtilen JSON dosyasını okuyup JavaScript verisine çevirir
function readData(fileName) {
  const filePath = path.join(__dirname, '..', 'data', fileName);
  const rawData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(rawData);
}

// Verilen JavaScript verisini JSON dosyasına yazar
function writeData(fileName, data) {
  const filePath = path.join(__dirname, '..', 'data', fileName);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

module.exports = { readData, writeData };