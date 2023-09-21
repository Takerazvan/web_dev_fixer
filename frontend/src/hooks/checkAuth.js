import React from 'react'

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useAuth = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.loggedIn);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const user = urlParams.get("user");

    if (token && user) {
      const decodedUser = decodeURIComponent(user);
      const userInfo = JSON.parse(decodedUser);
      const userId = userInfo.id;
      const userName = userInfo.name;

      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("userName", userName);

      dispatch({ type: "SET_LOGGED_IN", payload: true });
      window.location.href = "http://localhost:3000/newpen";
    }
  }, [isLoggedIn, dispatch]);
};
