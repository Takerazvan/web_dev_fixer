import { SET_HTML, SET_CSS, SET_JS } from "./actions";

const initialState = {
  html: "",
  css: "",
  js: "",
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_HTML:
      return { ...state, html: action.payload };
    case SET_CSS:
      return { ...state, css: action.payload };
    case SET_JS:
      return { ...state, js: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
