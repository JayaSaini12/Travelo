import React from 'react';

import {VALIDATOR_REQUIRE} from '../../shared/util/validators';
import Input from '../../shared/components/FormElements/Input';
import './NewPlace.css';

const NewPlace = () => {
  return(
    <form className='place-form'>
      <Input
       element="input" 
       type="text" 
       label="Title" 
       validators={[VALIDATOR_REQUIRE()]} 
       errorText="Please enter a valid title"/>
      {/* here these are the props given to the input.js aur yrh sab at runtime user dega */}
      {/* yaha se props leke waha input.js mai ja raha hai */}
    </form>
  );
};

export default NewPlace;