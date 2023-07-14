console.log("index.js");

async function stackMusic() {
    const searchWord = document.getElementById("word").value;
    console.log(searchWord);
    const searchData = await fetch(
        `http://localhost:3000/search?word=${searchWord}`
    ).then(res => res.json());

    console.log(searchData);
    return searchData;
}


//document.getElementById("submitmusic").addEventListener("click", stackMusic);