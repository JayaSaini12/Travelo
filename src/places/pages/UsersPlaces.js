import React, { useEffect, useState } from "react";
import PlaceList from "../components/PlaceList";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoaingSpinner";


const UserPlaces=props=>{
    //to get places of that user only not all
    const[loadedPlaces,setLoadedPlaces]=useState();
    const{isLoading,error,sendRequest,clearError}=useHttpClient();

    const userId = useParams().userId;

    useEffect(()=>{
        const fetchPlaces=async()=>{
            try{
                const responseData=await sendRequest(`http://localhost:5000/api/places/user/${userId}`);
                setLoadedPlaces(responseData.places);
            }catch(err){

            }
        };
        fetchPlaces();
    }
        ,[sendRequest,userId]
    );
    // const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);

    const placeDeletedHandler=deletedPlaceId=>{
        setLoadedPlaces(prevPlaces=>prevPlaces.filter(place=>place.id!==deletedPlaceId));
    }

    return(//return list of places
    <React.Fragment>
        <ErrorModal error={error} onClear={clearError}/>
        {isLoading && (
            <div className="center">
                <LoadingSpinner/>
            </div>
        )}
    {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler}/>}
    </React.Fragment>
    )
};

export default UserPlaces;