import React from "react"
const EventsDisplay = (props) => {
    // iterates over array of object (Calendar.js)
    let eventsList = props.events.map((event, i) => {
        let desc = ""
        if (event.description) {
            desc = event.description.replace(/(<([^>]+)>)/ig, '');
            desc = desc.replace(/&#39;/g, "'")
            desc = desc.replace(/&quot;/g, '')
        }
        
        return (
            //console.log('eventsList return: ' + i + event.id)
            <div class="card border mb-3" styles="max-width: 20rem;">
                <div class="card-header">{event.start_time}</div>
                <div class="card-body">
                    <h4 class="card-title">{event.title}</h4>
                    <p class="card-text">{event.venue_address}</p>
                    <p class="card-text">{desc}</p>
                    <form method='POST' action='/favorites/addFavorites'>
                        <input hidden type='text' name='id' value={event.id} />
                        <input type='button' value='Add to Event' />
                    </form>
                </div>
            </div>
        )
    })

    return (
        <div className="eventDisplay">
            {eventsList}
            {/* {eventsList} */}
        </div>
    );
}

export default EventsDisplay