const express = require("express");
const { MongoClient, ServerApiVersion } = require('mongodb');
//require("dotenv").config({ debug: true });
const bodyParser = require('body-parser');
const path = require('path');

let app = express();
const queue = [];


const uri = "mongodb://localhost:27017/wafflemusic";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});



app.use('/music', express.static(path.join(__dirname, 'view')));
app.use('/music', express.static(path.join(__dirname, 'images')));
//app.use('/wafflemusic', express.static(path.join(__dirname, 'music')));
app.use(bodyParser.json());


//apple music authorization
let music = MusicKit.getInstance();

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'view', 'home.html'));
});


//apple musicから曲を検索する関数
async function searchMusic(word) {
    const res = await fetch(`https://api.music.apple.com/v1/catalog/jp/search?term=${word}&types=songs&limit=10`);
    if(!res.ok) {
        console.log(`error search : ${word}`, res.status, res.statusText);
    }

    const getData = await res.json();
    console.log(getData);

    const musicBank = getData.result.songs.data;
    musicBank.forEach(ele => {
        queue.push(ele.id);
    });

    if(queue.length === musicBank.length) {
        nextplayMusic();
    }

    res.status(200);
    return queue;
}


//musicが再生し終わったら、要素の先頭を削除する
async function nextplayMusic() {
    if(queue.length > 0) {
        const trackID = queue[0];
        console.log(`now on playing ${trackID}`);

        //const res = await fetch(`https://api.music.apple.com/v1/catalog/jp/search?term=${word}&types=songs&limit=10`);
        
        if(!res.ok) {
            console.log("error", res.status, res.statusText);
        }

        music.authorize().then(function() {
            music.player.play();
            queue.shift();
            nextplayMusic();
          });
        // res.body.on("playend", () => {
        //     console.log(`finish song : ${trackID}`);
        //     queue.shift();
        //     nextplayMusic();
        // });
    }
}


app.get("/play", async (req, res) => {
    const word = req.query.word;
    searchMusic(word);
});


app.listen(3000, () => {
    console.log("Start Server!");
})