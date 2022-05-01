import './App.css';
import React from 'react'; 
import "antd/dist/antd.css";
import { Card } from 'antd';
import { Row, Col } from 'antd';
import { useEffect, useState } from "react";



const { Meta } = Card;

  var day = [
    {"name": "Monday", "image": "https://www.artnews.com/wp-content/uploads/2020/04/strokes.jpg?w=682", "song": "DojaCat - Say So", "songlink": "https://www.youtube.com/watch?v=QYh6mYIJG2Y"},
    { "name": "Tuesday", "image": "", "song": "", "songlink": ""}, 
    { "name": "Wednesday", "image": "", "song": "", "songlink": ""}, 
    { "name": "Thursday", "image": "", "song": "", "songlink": ""},
    { "name": "Friday", "image": "", "song": "", "songlink": ""}
  ]

  // var element = [];
  // for (var i in day){
  //   element.push((<Col span={4.8}>
  // <div onClick={event =>  window.location.href=day[i]["song-link"]}> 
  // <Card
  //     hoverable
  //     style={{ width: 240 }}
  //     cover={<img alt={day[i]["song"]} src={day[i]["image"]}/>}
  //   >
  //     <Meta title={day[i]["name"]} description={day[i]["song"]} />
  //   </Card></div></Col>));
  // }

function App() {
  
  var day = [
    { "name": "Monday", "image": "https://www.artnews.com/wp-content/uploads/2020/04/strokes.jpg?w=682", "song": "DojaCat - Say So", "song-link": "https://www.youtube.com/watch?v=QYh6mYIJG2Y"},
    { "name": "Tuesday", "image": "https://www.artnews.com/wp-content/uploads/2020/04/71bOXHJKHL._SL1400_-1.jpg", "song": "Pharrell Williams - Happy", "song-link": "https://www.youtube.com/watch?v=QYh6mYIJG2Y"}, 
    { "name": "Wednesday", "image": "https://www.artnews.com/wp-content/uploads/2020/04/aretha.jpg", "song": "Harry Hudson - Yellow Lights", "song-link": "https://www.youtube.com/watch?v=QYh6mYIJG2Y"}, 
    { "name": "Thursday", "image": "https://www.artnews.com/wp-content/uploads/2020/04/talking-heads.png", "song": "Katy Perry - Part of Me", "song-link": "https://www.youtube.com/watch?v=QYh6mYIJG2Y"}, 
    { "name": "Friday", "image": "https://www.artnews.com/wp-content/uploads/2020/04/NYC-Peech-Boys.jpg", "song": "Taylor Swift - Back to December", "song-link": "https://www.youtube.com/watch?v=QYh6mYIJG2Y"}
  ]


  var element = [];
  for (var i in day){
    element.push((<Col span={4.8}>
  <div onClick={event =>  window.location.href=day[i].songlink}> 
  <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt={day[i].song} src={day[i].image}/>}
    >
      <Meta title={day[i].name} description={day[i].song} />
    </Card></div></Col>));
  }


  return (
    <div className="App">
       <h1 className="tunein-logo">
          TuneIn
        </h1>
      <header className="App-header">
        <Row gutter={16}>
          {element}
        </Row>
        <div className = 'day'>

          <div /> 
        </div> 
        <input className= "input-style" id ="feeling" />
        <div className="App-button"> 
          <button className="unstyled-button" onClick = {genSongClicked}>New Song! </button>
        </div>
        
      </header>
    </div>
  );
}

const token = "BQBpnA2J3LDyB2LrDsUngv9JWMPzd2X8Bz2vFeOfGozv8rhfqei4PG3OUUS5tg8uRRhnbHcC10lTDbaaXP5w1L1XBFiKUqC-kzz7oQ5U3wusLnHCx-bgaUYzKe3uz6R_3iTlg2I6c0TqEcMMRpDGxWH0O7fEvqHRKp4dKXS7XBoks--ATjqDJCkfkmo";

function genSongClicked() {
  const dayToday = checkDay();
  const word = document.getElementById('feeling').value;
  if (dayToday != false){
    genSong(word, dayToday);
  } else {
    alert("A song has already been generated for today.");
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
      var choice = Math.floor(Math.random() * data.tracks.items.length);
      var curTrack = data.tracks.items[choice];
      var curTrackJson = {
        name: curTrack.name,
        artist: curTrack.artists[0].name,
        url: curTrack.external_urls.spotify,
        image: curTrack.album.images[0].url
      };
      document.cookie = dayToday + "=" + JSON.stringify(curTrackJson);
    });
    return;
  }

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

export default App;
