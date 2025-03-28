async function simuliereVerzögerung(ms)
{
    return new Promise((resolve) =>
    {
        setTimeout(resolve, ms)
    });
}

await simuliereVerzögerung(2000);
console.log("yeyyyyy")

async function addiereNachVerzögerung(a, b, ms)
{
    await simuliereVerzögerung(ms)
    return a + b
}

const resultat = await addiereNachVerzögerung(10, 20, 3000)
console.log(resultat)