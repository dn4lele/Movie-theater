const fs = require('fs');
const crypto = require('crypto');

// קבע את שם הקובץ של המשתמש
const usernameFile = 'txt.username';

// מערך של אלגוריתמי גיבוב
const hashingAlgorithms = [
  { 'hashing-algorithm': 'md5sum' },
  { 'hashing-algorithm': 'sha1sum' },
  { 'hashing-algorithm': 'sha256sum' }
];

// בחר באופן רנדומלי את אחד מסוגי הגיבוב
const selectedAlgorithm = hashingAlgorithms[Math.floor(Math.random() * hashingAlgorithms.length)];

// קרא את קובץ המשתמש
fs.readFile(usernameFile, (err, data) => {
  if (err) throw err;

  // בצע פעולת גיבוב על הנתונים המצויים בקובץ
  const hash = crypto.createHash(selectedAlgorithm['hashing-algorithm']).update(data).digest('hex');

  // כתוב את התוצאה לקובץ חדש
  const outputFile = 'txt.table-rainbow';
  const outputData = `${data.toString()}:${hash}\n`;
  fs.writeFile(outputFile, outputData, { flag: 'a' }, (err) => {
    if (err) throw err;
    console.log(`The result was saved to ${outputFile}`);
  });
});