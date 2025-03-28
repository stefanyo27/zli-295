//const zahl = process.argv[2]

function verdoppeln(zahl, callback)
{
    const ergebnis = zahl * 2;
    callback(ergebnis);
}

verdoppeln(5, function(baa) {
    console.log('Das Ergebnis ist:', baa);
});