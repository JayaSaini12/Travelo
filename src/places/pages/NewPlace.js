import React from 'react';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import { VALIDATOR_REQUIRE,VALIDATOR_MINLENGTH} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import './PlaceForm.css';


const NewPlace = () => {
  
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


  

  const placeSubmitHandler=event=>{
    event.preventDefault();//should not default submit the form and render the page
    //send data to the server
    console.log(formState.inputs);
  }

  return (
    <form className="place-form" onSubmit={placeSubmitHandler}>
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
  );
};

export default NewPlace;

