import React, {useState, useEffect} from 'react'
import FavoritesDisplay from './FavoritesDisplay'
import axios from 'axios';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'


export default function Favorites(props) {

    console.log('Favorites.js: ' +Object.keys(process.env))

    const [favorites,setFavorites] = useState([{1:""},{2:""}])

    //calls database on page render
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}v1/favorites/`, {
            headers: {"accept":"application/json",
            'content-type':'application/json'
            }
        })
        .then(favoritesList => {
            console.log(favoritesList.data)
            setFavorites(favoritesList.data)
            console.log(favorites)
        })
    },[])

    //updates state when delete button is pressed EventsTemplate.js
    const handleDelete = () => {
        axios.get(`${process.env.REACT_APP_SERVER_URL}v1/favorites/`, { email: `${props.user.email}`,
        headers: {"accept":"application/json",
        'content-type':'application/json'
        }
    })
    .then(favoritesList => {
        setFavorites(favoritesList.data)
    })
    .catch(err => console.log(err))
   }

   //render
    return (
        <div className="Calendar">
            <div class="row margin">
                <div class="col-4 offset-1">
                    <h3 id="calendar-title">Upcoming Events</h3>
                    <div id="events-display-container">
                        {/* {favorites} */}
                        <FavoritesDisplay favorites={favorites} handleDelete={handleDelete}/>
                    </div>
                </div>
                <div class="col-6">
                    <FullCalendar
                    plugins={[ dayGridPlugin ]}
                    initialView="dayGridMonth"
                    />
                </div>
            </div>
            {/* <p>{JSON.stringify(events)} </p> */}
        </div>
    )
}

