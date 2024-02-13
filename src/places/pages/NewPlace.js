import React,{useContext} from 'react';
import {useHistory} from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE,VALIDATOR_MINLENGTH} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './PlaceForm.css';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoaingSpinner';


const NewPlace = () => {
  const auth=useContext(AuthContext);
  const{isloading,error,sendRequest,clearError}=useHttpClient();
  const[formState,inputHandler]=useForm({
    title: {
      value: '',
      isValid: false
    },
    description: {
      value: '',
      isValid: false
    },
    address: {
      value: '',
      isValid: false
    }
  },false);
  // const titleInputHandler=useCallback((id,value,isValid)=>{
  //   dispatch({type:'INPUT_CHANGE', value:value, isvalid:isvalid, inputId:id})
  // },[]);//[] isme dependies  

  // const descriptionInputHandler=useCallback((id,value,isValid)=>{},[]);
  //make only one input hand;er to dispatch

  const history=useHistory();

  

  const placeSubmitHandler=async event=>{
    event.preventDefault();//should not default submit the form and render the page
    //send data to the server
    try{
      await sendRequest('http://localhost:5000/api/places','POST',JSON.stringify({
      title:formState.inputs.title.value,
      description:formState.inputs.description.value,
      address:formState.inputs.address.value,
      creator:auth.userId
    }),
    {'Content-Type':'application/json'}
    );
    //redirect user to a different page
    history.push('/');
    }catch(err){

    };
    

  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError}/>
    <form className="place-form" onSubmit={placeSubmitHandler}>
      {isloading &&<LoadingSpinner asOverlay/>}
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
      />
      {/* here these are the props given to the input.js aur yrh sab at runtime user dega */}
      {/* yaha se props leke waha input.js mai ja raha hai */}

      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (at least 5 characters)."
        onInput={inputHandler}
      />

      <Input
        id="address"
        element="input"
        label="Address"
        validators={[VALIDATOR_REQUIRE]}
        errorText="Please enter a valid Address."
        onInput={inputHandler}
      />

      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
    </React.Fragment>
  );
};

export default NewPlace;
