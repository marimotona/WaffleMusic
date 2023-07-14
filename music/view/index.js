console.log("index.js");

async function stackMusic() {
    const searchWord = document.getElementById("word").value;
    console.log(searchWord);
<<<<<<< HEAD
    const searchData = await fetch(
        `http://localhost:3000/search?word=${searchWord}`
    ).then(res => res.json());

    console.log(searchData);
    return searchData;
=======

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
>>>>>>> eb39d6eef96cb4542cebc455b7176376a28b8309
}


//document.getElementById("submitmusic").addEventListener("click", stackMusic);