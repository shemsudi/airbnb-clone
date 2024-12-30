import { jwtDecode } from "jwt-decode";
import { setBook } from "../redux/BookReducer";
import { setHost } from "../redux/HostReducer";
import setAuthToken from "./setAuthToken";
import { logOut, setCredentials } from "../redux/AuthReducer";
import { Dispatch } from "@reduxjs/toolkit";

interface DecodedToken {
  exp: number;
  [key: string]: string | number;
}

const safeParse = (item: string | null) => {
  try {
    return item ? JSON.parse(item) : null;
  } catch {
    return null;
  }
};

export const initializeAuth = (dispatch: Dispatch) => {
  console.log("connecting");
  const token = localStorage.getItem("jwtToken");
  const currentHost = safeParse(localStorage.getItem("currentHost"));
  const book = safeParse(localStorage.getItem("book"));

  if (book) dispatch(setBook(book));
  if (currentHost) dispatch(setHost(currentHost));
  if (token) {
    setAuthToken(token);
    const decoded: DecodedToken = jwtDecode(token);
    dispatch(setCredentials(decoded));

    const currentTime = Date.now() / 1000;
    const timeRemaining = decoded.exp - currentTime;

    if (timeRemaining > 0) {
      setTimeout(() => {
        dispatch(logOut());
        setAuthToken(false);
      }, timeRemaining * 1000);
    }
  }
};
