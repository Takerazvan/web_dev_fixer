

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
export const useAuth = () => {
  const dispatch = useDispatch();
 
const isLoggedIn = useSelector((state) => state.loggedIn);
  
  
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const user = urlParams.get("user");
    const localUser = localStorage.getItem("token");

    if (localUser) {
      dispatch({ type: "SET_LOGGED_IN", payload: true });
      
    }
 
    if (token && user) {
      const decodedUser = decodeURIComponent(user);
      const userInfo = JSON.parse(decodedUser);
      const userId = urlParams.get("userId");
      const userName = userInfo.name;
      window.location.href = "/newpen";
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("userName", userName);

     
     
    }
  }, [isLoggedIn,dispatch]);
};
