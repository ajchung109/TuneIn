import React from 'react'; 
import gift from './gift.json'; 

// import {Grid, Row, Col} from 'react-flexbox-grid'; 

const day = () => {
    return (
        <div className = "day"> 
        {gift.map( d => <div>{d.name}</div>)}
        </div>   
    ); 
}

export default day; 