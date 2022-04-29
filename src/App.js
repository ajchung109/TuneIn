import './App.css';
import React from 'react'; 
import day from './day'; 
import "antd/dist/antd.css";
import { Card } from 'antd';
import { Row, Col } from 'antd';


const { Meta } = Card;



function App() {

  var day = [
    { "name": "Monday", "image": "https://www.artnews.com/wp-content/uploads/2020/04/strokes.jpg?w=682", "song": "DojaCat - Say So"},
    { "name": "Tuesday", "image": "https://www.artnews.com/wp-content/uploads/2020/04/71bOXHJKHL._SL1400_-1.jpg", "song": "Pharrell Williams - Happy"}, 
    { "name": "Wednesday", "image": "https://www.artnews.com/wp-content/uploads/2020/04/aretha.jpg", "song": "Harry Hudson - Yellow Lights"}, 
    { "name": "Thursday", "image": "https://www.artnews.com/wp-content/uploads/2020/04/talking-heads.png", "song": "Katy Perry - Part of Me"}, 
    { "name": "Friday", "image": "https://www.artnews.com/wp-content/uploads/2020/04/NYC-Peech-Boys.jpg", "song": "Taylor Swift - Back to December" }
  ]

  var element = [];

  for (let i in day){
    element.push((<Col span={4.8}>
  <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt={day[i]["name"]} src={day[i]["image"]}/>}
    >
      <Meta title={day[i]["name"]} description={day[i]["song"]} />
    </Card></Col>));
  }


  return (
    <div className="App">
       <h1 className="tunein-logo">
          TuneIn
        </h1>
      <header className="App-header">
        <p> 
          Song of the Day: Link to Song Here??? Like a button and on clicking directs the user to the song 
        </p>
        <Row gutter={16}>
          {element}
        </Row>
        <div className = 'day'>

          <day /> 
        </div> 
        <input id ="feeling" />
        <div className="App-button"> 
          <button className="unstyled-button" onClick = {genSongClicked}>New Song! </button>
        </div>
        
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
  // document.cookie = dayToday + "=starships"
  // console.log(document.cookie)
  // return
  fetch('https://api.spotify.com/v1/search?q=' + word + '&type=track&limit=10', {
    method: 'GET',
    headers: {'Authorization' : 'Bearer ' + token}
  })
  .then(response => response.json())
  .then((data) => {
    console.log(data)
    const choice = Math.floor(Math.random() * data.tracks.items.length);
    document.cookie = dayToday + "=" + data.tracks.items[choice].name;
    });
  }

export default App;
