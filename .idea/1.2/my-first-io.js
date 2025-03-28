const fs = require('fs');

const path = process.argv[2];

function countNewLines()
{

    const fileText = fs.readFileSync(path, "utf8");
    const count = fileText.match(/\n/g).length;

    console.log(count);
}

countNewLines();