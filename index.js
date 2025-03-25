const express = require('express');
const path = require('path');
const os = require('os')

const app = express();

const PORT = process.env.PORT || 3000
const hostname = os.hostname();
const networkInterfaces = os.networkInterfaces();
const osType = os.type();
let network = null;
switch (osType) {
    case "Linux":
        network = (networkInterfaces.eth0 || networkInterfaces.enp0s3)?.find(en => en.family === 'IPv4');
        break;
    case "Darwin":
        network = (networkInterfaces.en0 || networkInterfaces.en1)?.find(en => en.family === 'IPv4');
        break;
    case "Windows_NT":
        network = networkInterfaces.Ethernet?.find(en => en.family === 'IPv4') || networkInterfaces.Wi - Fi?.find(en => en.family === 'IPv4');
        break;
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")))


app.get('/', (req, res, next) => {
    res.render('pages/index', { hostname: hostname, address: network.address })
})

app.listen(PORT, () => {
    console.log("Server is running on port:", PORT)
})