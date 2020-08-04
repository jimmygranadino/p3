import React from "react"
import axios from 'axios'


const EventsDisplay = (props) => {
    // iterates over array of object, cleans up some regex to look nice
    let eventsList = props.events.map((event, i) => {
        let desc = ""
        if (event.description) {
            desc = event.description.replace(/(<([^>]+)>)/ig, '');
            desc = desc.replace(/&#39;/g, "'")
            desc = desc.replace(/&quot;/g, '')
        }

        //headers to pass proper format to db
        let headerOptions = {
                'accept': 'application/json',
                // 'accept': 'text/json',
                'accept': 'text/javascript',
                'Content-Type': 'application/json'
            }   
        
        //add a favorite event to the database
        let handleClick = (e) => {
            console.log(props.user)
            console.log(`${process.env.REACT_APP_SERVER_URL}`)
            console.log(event)
            axios.post(`${process.env.REACT_APP_SERVER_URL}v1/favorites/testpost`, { title: `${event.title}`, eventId:`${event.id}`,date:`${event.start_time}`, location:`${event.venue_address}`, description: `${event.description}`, email: `${props.user.email}`}
            // , {
            //     headers:headerOptions
            // }
            )
            .then(response => {
                console.log(`bingo bongo! `+ JSON.stringify(response.data))
                        })
            .catch(err => {
                console.error(err)
            })
        }
        
        
        return (
            <div class="card border mb-3" styles="max-width: 20rem;">
                <div class="card-header">{event.start_time}</div>
                <div class="card-body">
                    <h4 class="card-title">{event.title}</h4>
                    <p class="card-text">{event.venue_address} <br/>
                    {event.city_name} , {event.region_abbr}
                    </p>
                    <p class="card-text">{desc}</p>
                    <button onClick={handleClick} className={`addButton`} id={`${event.id}`}>Add Event to Favorites</button>
                </div>
            </div>
        )
    })

    return (
        <div className="eventDisplay">
            {eventsList}
        </div>
    );
}

export default EventsDisplay