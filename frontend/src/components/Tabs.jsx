import React from 'react'


export default function Tabs({

  setActivePanel

}) {


  return (
  
    <nav
      className="navbar-nav justify-content-center "
      style={{ borderRadius: "10px", textAlign: "center" }}
    >
      <form className="form-inline">
        <button
          className="btn btn-dark"
          variant="outline-warning"
          type="button"
          onClick={() => setActivePanel("html")}
          id="test"
        >
          HTML
        </button>
        <button
          className="btn btn-dark"
          type="button"
          onClick={() => setActivePanel("css")}
          id="test"
        >
          CSS
        </button>
        <button
          className="btn btn-dark"
          type="button"
          onClick={() => setActivePanel("js")}
          id="test"
        >
          JS
        </button>
      </form>
    </nav>
  );
}
