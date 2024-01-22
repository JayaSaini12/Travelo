import React from "react";

import "./PlaceList.css";
import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";

const PlaceList=props=>{
    if(props.items.length===0){
        return(//if we dont have places
            <div className="place-list center">
                <Card>
                    <h2>
                        No places found.Maybe create one?
                    </h2>
                    <button>Share Places</button>
                </Card>
            </div>
        );
    }
    return(//if we have places
        <ul className="place-list">
            {props.items.map(place=>
                (<PlaceItem 
                    key={place.id} 
                    id={place.id} 
                    image={place.imageUrl} 
                    title={place.title} 
                    description={place.description} 
                    address={place.address} 
                    creatorid={place.creator} 
                    coordinates={place.location} 
                />))
            }
        </ul>
    )
};

export default PlaceList;