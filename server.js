// server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Funkce pro generování náhodného kódu
function generateRandomCode(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// Obsluha požadavku na vytvoření nové akce
app.post('/vytvorit-akci', (req, res) => {
    const nazevAkce = req.body.nazevAkce;
    const kodAkce = generateRandomCode(6);
    // Zde byste uložili informace o akci do databáze nebo souboru
    const urlAkce = `/${nazevAkce}-${kodAkce}.html`;
    res.send(urlAkce);
});

app.listen(3000, () => console.log('Server běží na portu 3000'));
