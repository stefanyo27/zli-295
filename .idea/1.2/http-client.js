const http = require("http");

console.log(process.argv[2]);

http.get(process.argv[2], (res) => {
    let raw = ""
    res.setEncoding("utf8")
    res.on("data", console.log)
}
)