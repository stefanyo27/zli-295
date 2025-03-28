const fs = require('fs');

const path = process.argv[2];

const format = process.argv[3];

function countNewLines()
{
    const fileText = fs.readFile(path, format);
    const count = fileText.match(/\n/g).length;
    console.log(count);
}

countNewLines();