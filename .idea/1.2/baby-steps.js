console.log(process.argv);

let sum = 0;

for ( let i = 2; i < process.argv.length; i++)
{
    let element = parseInt(process.argv[i]);
    sum += element;
}

console.log(sum)