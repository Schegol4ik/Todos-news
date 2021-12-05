import React from "react";
import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Notes from "./pages/Notes/Notes";
import Note from "./pages/Note/Note";


function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Notes/>}/>
            <Route path="/note/:id" element={<Note/>}/>
            <Route path="*" element={<div>404</div>}/>
        </Routes>
      </BrowserRouter>
  );
}

export default App;
