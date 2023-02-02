import React from "react"
import Navbar from "./Navbar/Navbar"
import Home from "./Home/Home"
import "bootstrap/dist/css/bootstrap.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/" exact element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}
