import React, { useEffect, useState } from 'react';

import UsersList from '../components/UsersList';

import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoaingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

const Users = () => {
  const{isLoading,error,sendRequest,clearError}=useHttpClient();
  const[loadedUsers,setLoadedUsers]=useState();

  useEffect(()=>{
    const fetchUsers=async()=>{
      try{
        const responseData= await sendRequest('http://localhost:5000/api/users');

      // const responseData=await response.json();

      setLoadedUsers(responseData.users);//as in backednd we have userkey
      }catch(err){     
      }
    };
    fetchUsers();
  },[sendRequest]);//now this is called whever this page loads and in auth we fetch whenevr we pressed button and passed it in a function


  return(
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError}/>
      {isLoading && (
        <div className="center">
          <LoadingSpinner/>
        </div>
      )}
      {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
    </React.Fragment>
  );
};

export default Users;
