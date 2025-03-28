import express from "express"

const app = express()
const port = 3000

app.get("/", async (req, res) => {
    const temp = await wetterAbfrage(8617)
    res.send(temp)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

async function wetterAbfrage(plz) {
    const url = `https://app-prod-ws.meteoswiss-app.ch/v1/plzDetail?plz=${plz}00`
    try {
        const response = await fetch(url)
        if (response.status == 200) {
            const data = ((await response.json()).currentWeather.temperature).toString()
            return data.toString()
        } else {
            console.error("Leider gefailt")
            return "Fehler: Wetter konnte nicht geladen werden"
        }
    } catch (e) {
        console.error(e)
        return "Fehler bei Verbindung zur API"
    }
}
