import React, { useState, useEffect } from 'react';

import useLocalStorage from '../hooks/useLocalStorage'
import Test from './Test';
import "bootstrap/dist/css/bootstrap.min.css"; 
import Footer from './Footer';
import NavBar from './NavBar';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Home';
import LoginRegsiter from './LoginRegsiter';
import Register from './Register';

function App() {
  const [html, setHtml] = useLocalStorage('html', '')
  const [css, setCss] = useLocalStorage('css', '')
  const [js, setJs] = useLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `)
    }, 250)

    return () => clearTimeout(timeout)
  }, [html, css, js])

  return (
    <>
      <Router>
        <NavBar />

        {/* <Test /> */}
        <div>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/components/buttons" element={<Test />} />
            <Route path="/test" element={<Test/>} />
            <Route path="/login" element={<LoginRegsiter />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
