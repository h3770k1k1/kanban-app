import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Importujemy nową wersję Route
import Home from './components/Home';  // Komponent Home
import UsersBoards from './components/UsersBoards';  // Komponent UsersBoards
import Board from './components/Board';  // Komponent Board

function App() {
  return (
    <Router>
      <Routes> 
        {/* Definiujemy ścieżki i komponenty, które mają być wyświetlane */}
        <Route path="/" element={<Home />} />
        <Route path="/users-boards" element={<UsersBoards />} />
        <Route path="/board" element={<Board />} />
      </Routes>
    </Router>
  );
}

export default App;
