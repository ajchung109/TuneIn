import './App.css';

function App() {
  return (
    <div className="App">
       <p>
          TuneIn
        </p>
      <header className="App-header">
        <input id ="feeling" />
        <button onClick = {genSongClicked}>New Song :)</button>
      </header>
    </div>
  );
}

const token = 'BQCXfFqFgS5ThU64ojj7VUV5nrc1y2jKjylb64XsJoSkJXHlRKRRuh517GqIFrMRvEKbp_MiFl_gjPwVZuuT0CAI3ipOQ72qHERdoDYxy1xd9IitqilcY0sF-LYs_BUmOs18SGfn1tdMa-_UQv7pgXnwcMpla-fjVLbcj18r';

function genSongClicked() {
  const dayToday = checkDay();
  if (dayToday != false){
    const word = document.getElementById('feeling').value;
    genSong(word, dayToday);
  } else {
    alert("A song has already been generated for today.")
  }
}

function checkDay() { 
  const dayToday = new Date().toLocaleString('default', {weekday: 'long'});
  if (document.cookie.includes(dayToday)){
    return false;
  } 
  return dayToday;
}

function genSong(word, dayToday) {
  fetch('https://api.spotify.com/v1/search?q=' + word + '&type=track&limit=10', {
    method: 'GET',
    headers: {'Authorization' : 'Bearer ' + token}
  })
  .then(response => response.json())
  .then((data) => {
    const choice = Math.floor(Math.random() * data.tracks.items.length);
    document.cookie = dayToday + "=" + data.tracks.items[choice].name;
    });
  }


export default App;
