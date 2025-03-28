

async function wetterAbfrage(plz)
{
    const url = `https://app-prod-ws.meteoswiss-app.ch/v1/plzDetail?plz=${plz}00` // Template String korrekt!
    try
    {
        const response = await fetch(url);
        if (response.status==200)
        {
            const data = (await response.json()).currentWeather.temperature
            console.log(data)
        }
        else
        {
            console.error("Leider gefailt")
        }
    }
    catch (e)
    {
        console.error(e)
    }
}

wetterAbfrage(8617)