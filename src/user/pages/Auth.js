import React, { useContext, useState } from 'react';

import './Auth.css';
import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import { VALIDATOR_EMAIL, VALIDATOR_MINLENGTH, VALIDATOR_REQUIRE } from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import Button from '../../shared/components/FormElements/Button';
import { AuthContext } from '../../shared/context/auth-context';

const Auth=()=>{
    const auth=useContext(AuthContext);//can use this on login methid
    const[isLoginMode,setIsLoginMode]=useState(true);
    const[formState,inputHandler,setFormData]=useForm({
        email:{
            value:'',
            isValid:false
        },
        password:{
            value:'',
            isValid:false
        }
    },false);

    const switchModelHandler=()=>{//switch mode of the form from signup sign in
        if(!isLoginMode){
            setFormData({//sign up mode
                ...formState.inputs,
                name:undefined   
            },formState.inputs.email.isValid && formState.inputs.password.isValid);//for form validation while switching in signup signin
        }else{//loginmode to signup mode
            setFormData({
                ...formState.inputs,//retain current state input
                name:{//add name field
                    value:'',
                    isValid:false
                }
            },false);//here form validity is false as name is added
        }
        setIsLoginMode(prevMode=>!prevMode);
    }

    const authSubmitHandler=event=>{
        event.preventDefault();
        console.log(formState.inputs);
        auth.login();
    }

    return(
        <Card classname='authentication'>
                <h2>Login Required</h2>
                <hr/>
                <form onSubmit={authSubmitHandler}>
                    {!isLoginMode && <Input element="input" id="name" type="text" label="Your Name" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter a name." onInput={inputHandler}/>}
                    <Input
                     element="input" 
                     id="email" 
                     type="email" 
                     label="E-mail" 
                     validators={[VALIDATOR_EMAIL()]} 
                     errorText="Please enter a valid email add"
                     onInput={inputHandler}/>
                     <Input
                     element="input" 
                     id="password" 
                     type="password" 
                     label="Password" 
                     validators={[VALIDATOR_MINLENGTH(5)]} 
                     errorText="Please enter a valid password atleast 5 chars"
                     onInput={inputHandler}/>
                     <Button type="submit" diasbled={!formState.isValid}>
                        {isLoginMode?'LOGIN':'SIGNUP'}
                     </Button>
                </form>
                <Button inverse onClick={switchModelHandler}>
                    SWITCH TO {isLoginMode?'SIGNUP':'LOGIN'}
                </Button>
        </Card>
    )
};

export default Auth;