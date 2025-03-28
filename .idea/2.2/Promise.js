import fs from "node:fs"

function leseDateiInhalt(filepath)
{
    //objekte(resolve, reject) werden mit allen informationen von promise gefüllt und dann kann man diese weiter verwenden
    return new Promise((resolve, reject) =>
        {
            fs.readFile(filepath, (err, data) =>
            {
                if (err) {
                    reject(err)
                } else {
                    resolve(data.toString())
                }
            })
        }
    )
}


leseDateiInhalt('C:\\Users\\seeme\\IdeaProjects\\ZLI_295\\resources\\hallo.txt')
    .then(inhalt => { console.log('Die Länge des Dateiinhalts beträgt:', inhalt.length);
    })
    .catch(err => { console.error('Fehler beim Lesen der Datei:', err);
    });