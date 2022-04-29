import React, {useEffect, useState} from "react" 

const UsingFetch = () => {
    const token = 'BQA-RLY01rNc4qL6K8_dfvQscCZ2oUbXzbDJiDppeyeRvu5o903p3xjuEWJpCWpz8WF-pu6EBhvQBLThikfZ3YsBxQCUXrb48t6ta_ohXqtDzHH8krDODbx_whEg3i2m2UE-l2frheb-ptLesvzqhaCOyK_-kI2PufzujjdVxqjOf0AdCwaOhySU2vs';
    const [song, setSong] = useState([])
    const word = document.getElementById('feeling').value;

    const fetchSong = () => {
        
            fetch('https://api.spotify.com/v1/search?q=' + word + '&type=track&limit=10', {
              method: 'GET',
              headers: {'Authorization' : 'Bearer ' + token}
            })
            .then(response => {return response.json()})
            .then((data) => {
              
               setSong(data)
            })
        }

        useEffect(() => {
            fetchSong()
        }, []) 

        return (
            <div> 
                {song}

            </div>
        )

        
    
}
export default UsingFetch; 