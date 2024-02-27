import { useState,useCallback,useEffect } from "react";

let logoutTimer;

export const useAuth=()=>{
    const [token, setToken] = useState(false);
  const [tokenExpirationDate, setTokenExpirationDate] = useState();
  const [userId, setUserId] = useState(false);

  
  const login = useCallback((uid, token,expirationDate) => {
    setToken(token);
    setUserId(uid);
    const tokenExpirationDate=expirationDate || new Date(new Date().getTime()+1000*60*60);//this token expiration date variable is different from above
    setTokenExpirationDate(tokenExpirationDate);
    localStorage.setItem('userData',JSON.stringify({
      userId:uid,token:token,expiration:tokenExpirationDate.toISOString()
    }))
  }, []);

  

  const logout = useCallback(() => {
    setToken(null);
    setTokenExpirationDate(null);
    setUserId(null);
    localStorage.removeItem('userData')//remove token after logout
  }, []);

  useEffect(()=>{
    if(token&& tokenExpirationDate){
      const remainingTime=tokenExpirationDate-new Date();
      logoutTimer=setTimeout(logout,remainingTime);
    }else{
      clearTimeout(logoutTimer);
    }
  },[token,logout,tokenExpirationDate])//whenever token changes logout


  useEffect(()=>{
    const storedData=JSON.parse(localStorage.getItem('userData'));//parse converts back string to json
    if(storedData && storedData.token && new Date(storedData.expiration)>new Date()){
      login(storedData.userId,storedData.token,new Date(storedData.expiration));
    }
  }, [login])//checks local storage for the token this function will only run once

  return{token,login,logout,userId};

}