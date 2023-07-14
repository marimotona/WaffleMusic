const express = require("express");
//require("dotenv").config({ debug: true });
const bodyParser = require('body-parser');
const path = require('path');
let app = express();


app.use('/music', express.static(path.join(__dirname, 'view')));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'home.html'));
});

const queue = [];
async function getmusicStack(word) {
    // const queue = [];
    queue.push(word);
    //console.log(queue);
}

app.get("/search", async (req, res) => {
    const word = req.query.word;
    const musicBank = await getmusicStack(word);
    console.log(musicBank);
});


app.listen(3000, () => {
    console.log("Start Server!");
})