import express from "express"

const app = express()
const port = 3000

app.get("/now", (req, res) => {
    res.send(Date.now().toLocaleString())
})

app.get("/zli", (req, res) => {
    res.redirect("https://www.zli.ch")
})

app.get("/name", (req, res) => {
    const randomIndex = Math.floor(Math.random() * namen.length)
    const getRandomName = namen[randomIndex]
    res.send(getRandomName)
})

app.get("/html", (req, res) => {
    res.sendFile("C:\\Users\\seeme\\IdeaProjects\\ZLI_295\\resources\\html.html")
})

app.get("/image", (req, res) => {
    res.sendFile("C:\\Users\\seeme\\IdeaProjects\\ZLI_295\\resources\\Bild.jpeg")
})

app.get("/teapot", (req, res) => {
    res.sendStatus(418)
})

app.get("/user-agent", (req, res) => {
    const userAgent = req.get("User-Agent")
    res.send(`Dein Browser ist: ${userAgent}`)
})

app.get("/secret", (req, res) => {
    res.sendStatus(403)
})

app.get("/xml", (req, res) => {
    res.set("Content-Type", "application/xml")
    res.sendFile("C:\\Users\\seeme\\IdeaProjects\\ZLI_295\\resources\\datei.xml")
})

app.get("/me", (req, res) => {
    res.set("Content-Type", "application/json")
    res.sendFile("C:\\Users\\seeme\\IdeaProjects\\ZLI_295\\resources\\dateiwewe.json")
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

const namen = [
    "Anna", "Ben", "Carla", "Dario", "Elena",
    "Fabio", "Giulia", "Hugo", "Isabel", "Jonas",
    "Kira", "Luca", "Mara", "Noah", "Olivia",
    "Paul", "Quentin", "Rosa", "Sven", "Tina"
]