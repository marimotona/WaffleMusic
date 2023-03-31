console.log("index.js");
const wordID = document.getElementById("word");


async function stackMusic() {
    const searchWord = document.getElementById("word").value;
    console.log(searchWord);
    // const searchData = await fetch(
    //     `http://localhost:3000/play?word=${searchWord}`
    // ).then(res => res.json());

    // console.log(searchData);
    // wordID.reset();
    // return searchData;

    try {
        const response = await fetch('/addsong', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(searchWord)
        });
    
        if (response.ok) {
          console.log('Song added');
        } else {
          console.error('Error adding song');
        }
      } catch (err) {
        console.error('Error adding song:', err);
      }
}


async function playSong() {
    try {
        const response = await fetch('/playsong');
    
        if (response.ok) {
          const song = await response.json();
          const audio = new Audio(song.attributes.url);
          audio.play();
          audio.addEventListener('ended', playSong);
        } else {
          console.error('Error playing next song');
        }
      } catch (err) {
          console.error('Error play song:', err);
      }
}


//document.getElementById("submitmusic").addEventListener("click", stackMusic);