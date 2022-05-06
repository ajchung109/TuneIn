import './App.css';
import React from 'react'; 
import "antd/dist/antd.css";
import { Card } from 'antd';
import { Row, Col } from 'antd';
import { useEffect, useState } from "react";



const { Meta } = Card;

  
function App() {
  // document.cookie = "Thursday=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  var day = [
    { "name": "Monday", "image": "https://www.artnews.com/wp-content/uploads/2020/04/strokes.jpg?w=682", "song": "DojaCat - Say So", "songlink": "https://www.youtube.com/watch?v=QYh6mYIJG2Y"},
    { "name": "Tuesday", "image": "https://www.artnews.com/wp-content/uploads/2020/04/71bOXHJKHL._SL1400_-1.jpg", "song": "Pharrell Williams - Happy", "songlink": "https://www.youtube.com/watch?v=QYh6mYIJG2Y"}, 
    { "name": "Wednesday", "image": "https://www.artnews.com/wp-content/uploads/2020/04/aretha.jpg", "song": "Harry Hudson - Yellow Lights", "songlink": "https://www.youtube.com/watch?v=QYh6mYIJG2Y"}, 
    { "name": "Thursday", "image": "https://www.artnews.com/wp-content/uploads/2020/04/talking-heads.png", "song": "Katy Perry - Part of Me", "songlink": "https://www.youtube.com/watch?v=QYh6mYIJG2Y"}, 
    { "name": "Friday", "image": "https://www.artnews.com/wp-content/uploads/2020/04/NYC-Peech-Boys.jpg", "song": "Taylor Swift - Back to December", "songlink": "https://www.youtube.com/watch?v=QYh6mYIJG2Y"}
  ]

  loadCookies(); 

  function loadCookies(){
  let x = document.cookie;   
  let decodeCookie = decodeURIComponent(x); 
  let ca= decodeCookie.split(';'); 
  let cookieDict = getCookieDict(ca);   
  for(var i in day){  
    let e = day[i]; 
    let weekday = e.name;   
    if(weekday in cookieDict){
      let info = cookieDict[weekday]; 
      e.songlink = info['url'];  
      e.image = info['image']; 
      e.song = info['artist'] + " - "+ info['name']; 
    }
  }
  }
  

  function getCookieDict(cList){
    var dict = {}; 
    for(let i = 0; i < cList.length; i++){
      var set = cList[i]; 
      var s = set.split("="); 
      var d = s[0].replace(" ", ""); 
      var info = JSON.parse(s[1]); 
      dict[d] = info; 
    }
    return dict; 
  }

  var element = [];
  for (var i in day){
    element.push((<Col span={4.8}>
  <div onClick={event => window.location.href=day[i].songlink}> 
  <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt={day[i].song} src={day[i].image}/>
    }
    >
      <Meta title={day[i].name} description={day[i].song} />
    </Card></div></Col>));
  }
  const [el, setEl] = useState(element); 

  function updateSong(){
    const d = new Date().toLocaleString('default', {weekday: 'long'});
    const today = d.replace(" ", ""); 
    let x = document.cookie;    
    let decodeCookie = decodeURIComponent(x); 
    let ca= decodeCookie.split(';'); 
    let song = getInfo(today, ca);  
    for(var i in day){  
      let el = day[i]; 
      let weekday = el.name;     
      if(el.name == today){ 
        el.songlink = song['url'];  
        el.image = song['image']; 
        el.song = song['artist'] + " - "+song['name']; 
      }
    } 
    resetCom(); 
  }

  function resetCom (){
  var element = [];
  for (var i in day){ 
    element.push((<Col span={4.8}>
  <div onClick={event => window.location.href=day[i].songlink}> 
  <Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt={day[i].song} src={day[i].image}/>}
    >
      <Meta title={day[i].name} description={day[i].song} />
    </Card></div></Col>));
  }
  setEl(element); 
  }

  function getInfo(day, cookieList){ 
    for(let i = 0; i < cookieList.length; i++){
      let c= cookieList[i];  
      let elements = c.split("="); 
      let thisDay = elements[0].replace(" ", "");  
      if(day == thisDay){
        var found = elements[1]; 
        var f = JSON.parse(found);  
        return f; 
      }
    }
    return ""; 
  }


  return (
    <div className="App">
       <h1 className="tunein-logo">
          TuneIn
        </h1>
      <header className="App-header" >
        <Row gutter={16} >
          {el}
        </Row>
        <div className = 'day'>

          <div /> 
        </div> 
        <input className= "input-style" id ="feeling" />
        <div className="App-button"> 
          <button className="unstyled-button" onClick = {genSongClicked}>New Song! </button>
          <button className = "unstyled-button" onClick = {updateSong} >Update</button>
        </div>
        
        
      </header>
    </div>
  );
}

const token = "BQCSr0wS0hRcVD2svGpG0xThfBA3Mod0VgC6YFt7OAV34e_o4D_ZbaQmGg2BSRndAvTWRupl5F1tnVvqiNXgo9Nw7PSrc1uREmsa2MtUQKlizX-GQhAcmc_BdsEdKUtIiHbUYdVUh_Rndrc2DLwQWzsgl26krfl7PR6Vcaf75CB0odlXCECGY7X5zgg";

function genSongClicked() {
  // const dayToday = checkDay();
  const dayToday = new Date().toLocaleString('default', {weekday: 'long'});
  const word = document.getElementById('feeling').value;
  genSong(word, dayToday); 
  // if (dayToday != false){
  //   genSong(word, dayToday);
  // } else {
  //   alert("A song has already been generated for today.");
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
      var choice = Math.floor(Math.random() * data.tracks.items.length);
      var curTrack = data.tracks.items[choice];
      var curTrackJson = {
        name: curTrack.name,
        artist: curTrack.artists[0].name,
        url: curTrack.external_urls.spotify,
        image: curTrack.album.images[0].url
      };
      document.cookie = dayToday + "=" + JSON.stringify(curTrackJson) + ";"; 
    });
    return;
  }


export default App;