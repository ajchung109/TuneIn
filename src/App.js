import './App.css';
import React from 'react'; 
// import {makeStyles, createStyles, Theme} from '@material-ui/core/styles'; 
import day from './day'; 
import "antd/dist/antd.css";
import { Card } from 'antd';
import { Row, Col } from 'antd';
const { Meta } = Card;

//import ReactDOM from 'react-dom'; 


function App() {

  var day = [
    { "name": "Monday", "image": "https://i.imgur.com/AD3MbBi.jpeg"},
    { "name": "Tuesday", "image": "https://i.imgur.com/0LINzxs.jpeg"}, 
    { "name": "Wednesday", "image": "https://i.imgur.com/eLmmpdR.jpeg"}, 
    { "name": "Thursday", "image": "https://i.imgur.com/pqggrK0.jpeg"}, 
    { "name": "Friday", "image": "https://i.imgur.com/jlFgGpe.jpeg" }
  ]

  var element = [];

  for (let i in day){
    element.push((<Col span={4.8}><Card
      hoverable
      style={{ width: 240 }}
      cover={<img alt={day[i]["name"]} src={day[i]["image"]}/>}
    >
      <Meta title={day[i]["name"]} description={day[i]["image"]} />
    </Card></Col>));
  }


  return (
    <div className="App">
       <h1>
          TuneIn
        </h1>
      <header className="App-header">
        <Row gutter={16}>
          {element}
        </Row>
        <div className = 'day'>

          <day /> 
        </div> 
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
