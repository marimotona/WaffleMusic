console.log("index.js");
const wordID = document.getElementById("word");


async function stackMusic() {
    const searchWord = document.getElementById("word").value;
    console.log(searchWord);
    const searchData = await fetch(
        `http://localhost:3000/play?word=${searchWord}`
    ).then(res => res.json());

    console.log(searchData);
    wordID.reset();
    return searchData;
}


//document.getElementById("submitmusic").addEventListener("click", stackMusic);