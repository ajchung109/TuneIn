import './App.css';
import React from 'react'; 
import "antd/dist/antd.css";
import { Card } from 'antd';
import { Row, Col } from 'antd';
import { useEffect, useState } from "react";



const { Meta } = Card;


var x = ""
var y = ""

  // var day = [
  //   {"name": "Monday", "image": "https://www.artnews.com/wp-content/uploads/2020/04/strokes.jpg?w=682", "song": "DojaCat - Say So", "songlink": "https://www.youtube.com/watch?v=QYh6mYIJG2Y"},
  //   { "name": "Tuesday", "image": "", "song": "", "songlink": ""}, 
  //   { "name": "Wednesday", "image": "", "song": "", "songlink": ""}, 
  //   { "name": "Thursday", "image": "", "song": "", "songlink": ""},
  //   { "name": "Friday", "image": "", "song": "", "songlink": ""}
  // ]

function App() {
  
  var day = [
    { "name": "Monday", "image": "https://www.artnews.com/wp-content/uploads/2020/04/strokes.jpg?w=682", "song": "The Strokes - The Adults are Talking", "songlink": "https://open.spotify.com/album/2xkZV2Hl1Omi8rk2D7t5lN?highlight=spotify:track:5ruzrDWcT0vuJIOMW7gMnW"},
    { "name": "Tuesday", "image": "https://i1.sndcdn.com/artworks-000069755023-k1kc7q-t500x500.jpg", "song": "Pharrell Williams - Happy", "songlink": "https://open.spotify.com/album/0lrmy4pJINsFzycJvttX2W"}, 
    { "name": "Wednesday", "image": "https://images.surfacemag.com/app/uploads/2022/03/29123410/harry-styles-harrys-house.jpg", "song": "Harry Styles - As It Was", "songlink": "https://wwwhttps://open.spotify.com/album/2pqdSWeJVsXAhHFuVLzuA8.youtube.com/watch?v=QYh6mYIJG2Y"}, 
    { "name": "Thursday", "image": "https://m.media-amazon.com/images/I/71o97DFZzdL._SS500_.jpg", "song": "Katy Perry - Part of Me", "songlink": "https://open.spotify.com/track/1nZzRJbFvCEct3uzu04ZoL"}, 
    { "name": "Friday", "image": "Surprise!", "song": "Surprise!", "songlink": "Surprise!"}
    // { "name": "Friday", "image": "https://i.scdn.co/image/ab67616d00001e02563151cc3a0528d8228998c8", "song": "Taylor Swift - Red", "songlink": "https://open.spotify.com/album/6x9s2ObPdpATZgrwxsk9c0"}
  ]


  var element = [];
    for (var i in day){
      element.push((<Col span={4.8}>
    <div onClick={redirectPage}> 
    <Card
        hoverable
        style={{ width: 240 }}
        cover={<img alt={day[i].song} src={day[i].image}/>}
      >
        <Meta title={day[i].name} description={day[i].song}/>
      </Card></div></Col>));
    }

  
  function redirectPage() { 
    let newPage = x;
    day[0].song = y;
    console.log(day[0].song);
    window.location.href= newPage;
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

const token = "BQAJ1TgbwXvUGos21ZyGNEmv21jb9eBtwoXHJzX_4Q5se9tYuxb3PvK2FTh2BXAUaWRz7ic0C7jYDPPGLh4EFnE_OX6AwiQguXV47S6X4EuuEs8YkwLAZlCULEFUmAduYondleKzGpZ5bzDUxQdvLgk1AEaM";

function genSongClicked() {
  const dayToday = checkDay();
  const word = document.getElementById('feeling').value;
 if (dayToday != false){
    genSong(word, dayToday);
   } 
    else {
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
      x = curTrackJson.url;
      y = curTrackJson.artist;
      console.log(x);
      console.log(y);
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
