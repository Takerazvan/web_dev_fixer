import React, { useState } from 'react'
import useLocalStorage from "../hooks/useLocalStorage";

export default function Tabs({
  activePanel,
  setActivePanel,
  html,
  setHtml,
  css,
  setCss,
  js,
  setJs,
  srcDoc,
  setSrcDoc
}) {


  return (
    // <div className="sidebar">
    //   <button className="tab-button" onClick={() => setActivePanel("html")}>
    //     HTML
    //   </button>
    //   <button className="tab-button" onClick={() => setActivePanel("css")}>
    //     CSS
    //   </button>
    //   <button className="tab-button" onClick={() => setActivePanel("js")}>
    //     JS
    //   </button>
    // </div>
    <nav
      class="navbar-nav justify-content-center "
      style={{ borderRadius: "10px", textAlign: "center" }}
    >
      <form class="form-inline">
        <button
          class="btn btn-dark"
          variant="outline-warning"
          type="button"
          onClick={() => setActivePanel("html")}
          id="test"
        >
          HTML
        </button>
        <button
          class="btn btn-dark"
          type="button"
          onClick={() => setActivePanel("css")}
          id="test"
        >
          CSS
        </button>
        <button
          class="btn btn-dark"
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
