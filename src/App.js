import './App.css';
import React from 'react'; 
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {Card} from 'react-bootstrap';
import { Checkbox } from 'antd';


<<<<<<< HEAD
function App() {
  
    const [day, setDay] = useState([
    {"dayName": "Monday", "songName": "", "songArtist": " ", "songLink": ""},
    { "dayName": "Tuesday", "songName": "", "songArtist": " ", "songLink": ""}, 
    { "dayName": "Wednesday", "songName": "", "songArtist": " ", "songLink": ""}, 
    { "dayName": "Thursday", "songName": "", "songArtist": " ", "songLink": ""},
    { "dayName": "Friday", "songName": "", "songArtist": " ", "songLink": ""}
  ]);
  const token = "BQABKIsUyoZpLd7OnnCfURugU71ywpK1atnf5zufl1c-JnGitzABmRUEWefnhtzTNEpaOFqYFnaBGphyqFw_Xv-djcfyMqoi71qzPsYiLr5XyDd6XbX1L62dQK-Gq_3tOghwJv7zbght1XExpDebZQxb2EAeZZiJmlp2DzMiIu2zEDi6go4a60Dp0oA";
  loadCookies(); 

  function loadCookies() {
    let x = document.cookie; 
    console.log(x); 
    let decodeCookie = decodeURIComponent(x); 
    let splitCookie = decodeCookie.split(";"); 
    let cookieDict = getCookieDict(splitCookie); 
    for (var i in day){
      let el = day[i]; 
      let weekday = el.dayName; 
      if (weekday in cookieDict){
        let info = cookieDict[weekday];
        el.songlink = info['songlink']; 
        el.songName = info['songName'] + "-" + info['songArtist']; 
      }
       
    } 

  }

  function getCookieDict(splitCookie){
    var dict = {};
    for (let i = 0; i < splitCookie.length; i++){
      var set = splitCookie[i];
      var splitSet = set.split("="); 
      var day = splitSet[0].replace(" ", ""); 
      var info = JSON.parse(splitSet[1]); 
      dict[day] = info;  
    } 
    return dict; 
  }

function genSongClicked() {
  var field = document.getElementById('feeling').value;
  field = field.replace(" ", "");
  field = field.split(",");
  const curDay = field[1];
  const word = field[0];
  const dayToday = checkDay(curDay);
 if (dayToday != false){
    genSong(word, dayToday);
   } 
    else {
    alert("A song has already been generated for today.");
  }
=======

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


>>>>>>> 7ea47cbb8ae4dba47d51aba547277a482b3eea5f
 }

function checkDay(curDay) { 
  // const dayToday = new Date().toLocaleString('default', {weekday: 'long'});
  if (document.cookie.includes(curDay)){
    return false;
  } 
  return curDay;
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
        dayName: dayToday,
        songName: curTrack.name,
        songArtist: curTrack.artists[0].name,
        songLink: curTrack.external_urls.spotify,
      };
<<<<<<< HEAD
      document.cookie = dayToday + "=" + JSON.stringify(curTrackJson);
      const dayHash = {"Monday": 0, "Tuesday": 1, "Wednesday": 2, "Thursday": 3, "Friday": 4};
      day[dayHash[dayToday]] = curTrackJson;
      const temp = [...day];
      setDay(temp);
=======
      document.cookie = dayToday + "=" + JSON.stringify(curTrackJson) + ";"; 
>>>>>>> 7ea47cbb8ae4dba47d51aba547277a482b3eea5f
    });
  }

<<<<<<< HEAD
  // if (document.cookie != ""){
  //   var cookieStuff = decodeURIComponent(document.cookie);
  //   cookieStuff = cookieStuff.split("=");
  //   var pointer = 0;
  //   const hey = JSON.stringify(cookieStuff[1]);
  //   console.log("hey", hey.dayName);
  //   const dayHash = {"Monday": 0, "Tuesday": 1, "Wednesday": 2, "Thursday": 3, "Friday": 4};
  //   while (pointer < cookieStuff.length){
  //     day[dayHash[cookieStuff[pointer]]] = cookieStuff[pointer + 1];
  //     pointer += 2;
  //   }
  //   console.log(day);
  // }

  return (
    <div className = "body">
        <h4 class = "App-header">Tune In</h4>
        <Row id = "update">
            <Card class = 'cards' style={{ width: '15rem' }}>
              <Card.Body>
              <Card.Title>{day[0].dayName}</Card.Title>
              <Card.Text>
              {day[0].songName}<br/>
              {day[0].songArtist}<br/>
              <a href = {day[0].songLink}>SongLink</a><br/>
              </Card.Text>
            </Card.Body>
            <Card.Img variant="top" src="holder.js/100px180" />
          </Card>
          
          <Card class = 'cards' style={{ width: '15rem' }}>
              <Card.Body>
              <Card.Title>{day[1].dayName}</Card.Title>
              <Card.Text>
              {day[1].songName}<br/>
              {day[1].songArtist}<br/>
              <a href = {day[1].songLink}><img src = 'images/spotifyCode.jpg'/></a><br/>
              </Card.Text>
            </Card.Body>
            <Card.Img variant="top" src="holder.js/100px180" />
          </Card>

          <Card class = 'cards' style={{ width: '15rem' }}>
              <Card.Body>
              <Card.Title>{day[2].dayName}</Card.Title>
              <Card.Text>
                {day[2].songName}<br/>
                {day[2].songArtist}<br/>
                <a href = {day[2].songLink}>SongLink</a><br/>
              </Card.Text>
            </Card.Body>
            <Card.Img variant="top" src="holder.js/100px180" />
          </Card>

          <Card class = 'cards' style={{ width: '15rem' }}>
              <Card.Body>
              <Card.Title>{day[3].dayName}</Card.Title>
              <Card.Text>
                {day[3].songName}<br/>
                {day[3].songArtist}<br/>
                <a href = {day[3].songLink}>SongLink</a><br/>
              </Card.Text>
            </Card.Body>
            <Card.Img variant="top" src="holder.js/100px180" />
          </Card>

          <Card class = 'cards' style={{ width: '15rem' }}>
              <Card.Body>
              <Card.Title>{day[4].dayName}</Card.Title>
              <Card.Text>
              {day[4].songName}<br/>
              {day[4].songArtist}<br/>
              <a href = {day[4].songLink}>SongLink</a><br/>
              </Card.Text>
            </Card.Body>
            <Card.Img variant="top" src="holder.js/100px180" />
          </Card>
        </Row>
        <div className = "bottomRow"> 
          <input className= "input-style" id ="feeling" /> 
        <button className = "genButton" onClick={() => {genSongClicked();}}>Generate Song!</button>
        </div>
      </div>
    );
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
  
  
=======
>>>>>>> 7ea47cbb8ae4dba47d51aba547277a482b3eea5f

export default App;