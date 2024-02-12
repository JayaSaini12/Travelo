import React from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";

const DUMMY_PLACES=[
    {
        id:'P1',
        title:'Empire State Building',
        description:'One of the most famous sky',
        imageUrl:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        address:"20 W 34th St., New York, NY 10001, United States",
        location:{
            lat: 40.7484405,
            lng: -73.987,
        },
        creator:'u1'
    },
    {
        id:'P2',
        title:'Emp. State Building',
        description:'One of the most famous sky',
        imageUrl:'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg',
        address:"20 W 34th St., New York, NY 10001, United States",
        location:{
            lat: 40.7484405,
            lng: -73.987,
        },
        creator:'u2'
    },
];

const UserPlaces=props=>{
    //to get places of that user only not all
    const userId = useParams().userId;
    const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
    return(//return list of places
    <PlaceList items={loadedPlaces}/>
    )
};

export default UserPlaces;