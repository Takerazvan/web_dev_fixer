export const SET_HTML = "SET_HTML";
export const SET_CSS = "SET_CSS";
export const SET_JS = "SET_JS";

export const setHtml = (html) => ({
  type: SET_HTML,
  payload: html,
});

export const setCss = (css) => ({
  type: SET_CSS,
  payload: css,
});

export const setJs = (js) => ({
  type: SET_JS,
  payload: js,
});
