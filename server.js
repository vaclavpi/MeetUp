const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const akce = {}; // Ukládání informací o akcích

// Generování náhodného kódu
function generateRandomCode(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// Obsluha požadavku na vytvoření nové akce
app.post('/vytvorit-akci', (req, res) => {
    const nazevAkce = req.body.nazevAkce;
    const kodAkce = generateRandomCode(6); // Funkce na generování náhodného kódu
    const urlAkce = `/${encodeURIComponent(nazevAkce)}-${kodAkce}.html`; // Převedení názvu akce na URL
    akce[kodAkce] = { nazevAkce, ucastnici: [] }; // Uložení informací o akci
    res.send(urlAkce);
});

// Obsluha GET požadavku na jednotlivé stránky akcí
app.get('/akce/:nazevAkce/:kodAkce', (req, res) => {
    const nazevAkce = req.params.nazevAkce;
    const kodAkce = req.params.kodAkce;
    const akceInfo = akce[kodAkce];
    if (akceInfo && akceInfo.nazevAkce === nazevAkce) {
        res.sendFile(path.join(__dirname, 'public', 'akce.html')); // Poslat HTML stránku pro akci
    } else {
        res.status(404).send('Akce nenalezena.');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server běží na portu ${PORT}`));
