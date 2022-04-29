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
    element.push((<Col span={4.8}><Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt={day[i]["name"]} src={day[i]["image"]}/>}
    >
      <Meta title={day[i]["name"]} description={day[i]["song"]} />
    </Card></Col>));
  }


  return (
    <div className="App">
       <h1>
          TuneIn
        </h1>
      <header className="App-header">
        <div id = "newsong">test
        </div>
        <Row gutter={16}>
          {element}
        </Row>
        <div className = 'day'>

          <day /> 
        </div> 
        <input id ="feeling" />
        <p>this.state.song</p>
        <button onClick = {genSongClicked}>New Song!</button>
      </header>
    </div>
  );
}

const token = 'BQDw7PECV2LmfpJTJkTCGRrk-w8nFpquCVCuYTMAK5NA66e2KwrMRfbKUKmr6G08eVOvzkgTGppPDULVfuQNiHOrDI6fHbwSIIFWK97MKQZPpJFSMhZZMysxxMiyPzm_iRUG0_yjIJaSlfTwF0zR5ics_pbqWgA9nk6yQ7ORTYX1nZmo-6_ZVXzMehk';

function genSongClicked() {
  const dayToday = checkDay();
  const word = document.getElementById('feeling').value;
  genSong(word,dayToday); 
 
  // if (dayToday != false){
  //   const word = document.getElementById('feeling').value;
  //   genSong(word, dayToday);
  // } else {
  //   alert("A song has already been generated for today.")
  // }
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
      
       console.log(data.tracks.items[0].external_urls.spotify);
      
    });
  // data.tracks.items[0].external_urls.spotify
  // document.cookie = dayToday + "=starships"
  // console.log(document.cookie)
  // return
  // const fetchSong = async() => {
  //   const response = await fetch('https://api.spotify.com/v1/search?q=' + word + '&type=track&limit=10', {
  //     method: 'GET',
  //     headers: {'Authorization' : 'Bearer ' + token}
  //   })
  //   .then(response => response.json())
  //   .then((data) => {
      
  //      return data.tracks.items[0].external_urls.spotify;
  //   });
  //   const {song} = await response.json(); 
  //   this.setState({
  //     song 
  //   }); 
    

  // }; 
  // fetchSong(); 
  
  

    // const choice = Math.floor(Math.random() * data.tracks.items.length);
    // document.cookie = dayToday + "=" + data.tracks.items[choice].name;
    // const newDiv = document.createElement("div"); 
    // const newTag = '<a href= ' + song + '>Click Me</a>'; 
    // newDiv.innerHTML = newTag;   
    // const currentDiv = document.getElementById("newsong"); 
    // let container = document.querySelector('div'); 
    // let head = container.querySelector('header'); 
    // container.insertBefore(newDiv,currentDiv ); 
    
  }


export default App;
