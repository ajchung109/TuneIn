import './App.css';
import React from 'react'; 
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import {Card} from 'react-bootstrap';
import { Checkbox } from 'antd';


function App() {
  
    const [day, setDay] = useState([
    {"dayName": "Monday", "songName": "", "songArtist": " ", "songLink": ""},
    { "dayName": "Tuesday", "songName": "", "songArtist": " ", "songLink": ""}, 
    { "dayName": "Wednesday", "songName": "", "songArtist": " ", "songLink": ""}, 
    { "dayName": "Thursday", "songName": "", "songArtist": " ", "songLink": ""},
    { "dayName": "Friday", "songName": "", "songArtist": " ", "songLink": ""}
  ]);

  const token = "BQAn4gHDG8HJSNcvaU3XWz4uihzD2HOQrfEkB5AIA6Vj88j-YRrT5Vx_WSNy_pHbMca2tNimmcE2q9bwg4BIKAEwfbGYkhjMdid7bcGNPl-0OBPNfevt7cR-qgx0SAmvBv747pj4x-OE3DveeqKRk0SiH2MbNbky529GMDA5ex8xGcM";

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
      document.cookie = dayToday + "=" + JSON.stringify(curTrackJson);
      const dayHash = {"Monday": 0, "Tuesday": 1, "Wednesday": 2, "Thursday": 3, "Friday": 4};
      day[dayHash[dayToday]] = curTrackJson;
      const temp = [...day];
      setDay(temp);
    });
  }

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
    <div style={{ display: 'block', padding: 30, width: '100%' }}>
        <h4>Tune In</h4>
        <Row id = "update">
            <Card style={{ width: '15rem' }}>
              <Card.Body>
              <Card.Title>{day[0].dayName}</Card.Title>
              <Card.Text>
              {day[0].songName}<br/>
              {day[0].songArtist}<br/>
              {day[0].songLink}<br/>
              </Card.Text>
            </Card.Body>
            <Card.Img variant="top" src="holder.js/100px180" />
          </Card>
          
          <Card style={{ width: '15rem' }}>
              <Card.Body>
              <Card.Title>{day[1].dayName}</Card.Title>
              <Card.Text>
              {day[1].songName}<br/>
              {day[1].songArtist}<br/>
              {day[1].songLink}<br/>
              </Card.Text>
            </Card.Body>
            <Card.Img variant="top" src="holder.js/100px180" />
          </Card>

          <Card style={{ width: '15rem' }}>
              <Card.Body>
              <Card.Title>{day[2].dayName}</Card.Title>
              <Card.Text>
                {day[2].songName}<br/>
                {day[2].songArtist}<br/>
                {day[2].songLink}<br/>
              </Card.Text>
            </Card.Body>
            <Card.Img variant="top" src="holder.js/100px180" />
          </Card>

          <Card style={{ width: '15rem' }}>
              <Card.Body>
              <Card.Title>{day[3].dayName}</Card.Title>
              <Card.Text>
                {day[3].songName}<br/>
                {day[3].songArtist}<br/>
                {day[3].songLink}<br/>
              </Card.Text>
            </Card.Body>
            <Card.Img variant="top" src="holder.js/100px180" />
          </Card>

          <Card style={{ width: '15rem' }}>
              <Card.Body>
              <Card.Title>{day[4].dayName}</Card.Title>
              <Card.Text>
              {day[4].songName}<br/>
              {day[4].songArtist}<br/>
              {day[4].songLink}<br/>
              </Card.Text>
            </Card.Body>
            <Card.Img variant="top" src="holder.js/100px180" />
          </Card>
        </Row>
        <input className= "input-style" id ="feeling" />
        <button onClick={() => {genSongClicked();}}>Generate Song!</button>
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
