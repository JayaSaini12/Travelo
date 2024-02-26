import React, { useState, useContext } from 'react';

import Card from '../../shared/components/UIElements/Card';
import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoaingSpinner';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import './Auth.css';

// const Auth=()=>{
//     const auth=useContext(AuthContext);//can use this on login methid
//     const[isLoginMode,setIsLoginMode]=useState(true);
//     const[isLoading,setIsLoading]=useState(false);
//     const[error,setError]=useState();

//     const[formState,inputHandler,setFormData]=useForm({
//         email:{
//             value:'',
//             isValid:false
//         },
//         password:{
//             value:'',
//             isValid:false
//         }
//     },false);

//     const switchModelHandler=()=>{//switch mode of the form from signup sign in
//         if(!isLoginMode){
//             setFormData({//sign up mode
//                 ...formState.inputs,
//                 name:undefined   
//             },formState.inputs.email.isValid && formState.inputs.password.isValid);//for form validation while switching in signup signin
//         }else{//loginmode to signup mode
//             setFormData({
//                 ...formState.inputs,//retain current state input
//                 name:{//add name field
//                     value:'',
//                     isValid:false
//                 }
//             },false);//here form validity is false as name is added
//         }
//         setIsLoginMode(prevMode=>!prevMode);
//     }

//     const authSubmitHandler=async event=>{
//         event.preventDefault();

//         setIsLoading(true);//as we are loading sigup user and want to ui rerender

//         if(isLoginMode){
//             try{
//                 const response =await fetch('http://localhost:5000/api/users/login',{
//                 method:'POST',
//                 headers:{
//                     'Content-Type':'application/json'
//                 },
//                 body:JSON.stringify({
//                     email:formState.inputs.email.value,
//                     password:formState.inputs.password.value
//                 })
//             });

//             const responsedata=await response.json();//returns a new promise
//             if(!response.ok){//i.e a 400 or 500 error
//                 throw new Error(responsedata.message);
//             }
            
//             auth.login();
//             }catch(err){
//                 console.log(err);
//                 setError(err.message||'Something went wrong,please try again.');
//             }
//         }
//         else{//signup
            
//             try{
//                 const response =await fetch('http://localhost:5000/api/users/signup',{
//                 method:'POST',
//                 headers:{
//                     'Content-Type':'application/json'
//                 },
//                 body:JSON.stringify({
//                     name: formState.inputs.name.value,
//                     email:formState.inputs.email.value,
//                     password:formState.inputs.password.value
//                 })
//             });

//             const responsedata=await response.json();//returns a new promise
//             if(!response.ok){//i.e a 400 or 500 error
//                 throw new Error(responsedata.message);
//             }
            
//             auth.login();
//             }catch(err){
//                 console.log(err);
//                 setError(err.message||'Something went wrong,please try again.');
//             }    
//         }
//         setIsLoading(false);
//     }

//     const errorHandler=()=>{
//         setError(null);
//     };

//     return(
//         <React.Fragment>
//             <ErrorModal error={error} onClear={errorHandler}/>
//         <Card classname='authentication'>
//             {isLoading && <LoadingSpinner asOverlay/>}
//                 <h2>Login Required</h2>
//                 <hr/>
//                 <form onSubmit={authSubmitHandler}>
//                     {!isLoginMode && <Input element="input" id="name" type="text" label="Your Name" validators={[VALIDATOR_REQUIRE()]} errorText="Please enter a name." onInput={inputHandler}/>}
//                     <Input
//                      element="input" 
//                      id="email" 
//                      type="email" 
//                      label="E-mail" 
//                      validators={[VALIDATOR_EMAIL()]} 
//                      errorText="Please enter a valid email add"
//                      onInput={inputHandler}/>
//                      <Input
//                      element="input" 
//                      id="password" 
//                      type="password" 
//                      label="Password" 
//                      validators={[VALIDATOR_MINLENGTH(5)]} 
//                      errorText="Please enter a valid password atleast 5 chars"
//                      onInput={inputHandler}/>
//                      <Button type="submit" diasbled={!formState.isValid}>
//                         {isLoginMode?'LOGIN':'SIGNUP'}
//                      </Button>
//                 </form>
//                 <Button inverse onClick={switchModelHandler}>
//                     SWITCH TO {isLoginMode?'SIGNUP':'LOGIN'}
//                 </Button>
//         </Card>
//         </React.Fragment>
//     )
// };

// export default Auth;

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: '',
        isValid: false
      },
      password: {
        value: '',
        isValid: false
      }
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image:undefined
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: '',
            isValid: false
          },
          image:{
            value:null,
            isValid:false
          }
        },
        false
      );
    }
    setIsLoginMode(prevMode => !prevMode);
  };

  const authSubmitHandler=async event=>{
             event.preventDefault();
            console.log(formState.inputs);
             if (isLoginMode) {
              try {
                const responseData =await sendRequest(
                  'http://localhost:5000/api/users/login',
                  'POST',
                  JSON.stringify({
                    email: formState.inputs.email.value,
                    password: formState.inputs.password.value
                  }),
                  {
                    'Content-Type': 'application/json'
                  }
                );
                auth.login(responseData.user.id);
              } catch (err) {}
            } else {
              try {
                const formData=new FormData();
                formData.append('email',formState.inputs.email.value);
                formData.append('name',formState.inputs.name.value);
                formData.append('password',formState.inputs.password.value);
                formData.append('image',formState.inputs.image.value);
                const responseData=await sendRequest(
                  'http://localhost:5000/api/users/signup',
                  'POST',
                  formData
                );
        
                auth.login(responseData.user.id);
              } catch (err) {}
            }
          };
  return (
    <React.Fragment>
    <ErrorModal error={error} onClear={clearError}/>
    <Card className="authentication">
       {isLoading && <LoadingSpinner asOverlay/>}
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            element="input"
            id="name"
            type="text"
            label="Your Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a name."
            onInput={inputHandler}
          />
        )}
        {!isLoginMode&&<ImageUpload center id="image" onInput={inputHandler} errorText="Please provode an image."/>}
        <Input
          element="input"
          id="email"
          type="email"
          label="E-Mail"
          validators={[VALIDATOR_EMAIL()]}
          errorText="Please enter a valid email address."
          onInput={inputHandler}
        />
        <Input
          element="input"
          id="password"
          type="password"
          label="Password"
          validators={[VALIDATOR_MINLENGTH(6)]}
          errorText="Please enter a valid password, at least 6 characters."
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? 'LOGIN' : 'SIGNUP'}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        SWITCH TO {isLoginMode ? 'SIGNUP' : 'LOGIN'}
      </Button>
    </Card>
    </React.Fragment>
  );
};

export default Auth;

