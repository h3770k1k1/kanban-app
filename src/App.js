import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import { DndProvider } from 'react-dnd'; // Importujemy DndProvider
import { HTML5Backend } from 'react-dnd-html5-backend'; // Backend dla drag and drop
import Home from './components/Home';  
import UsersBoards from './components/UsersBoards';  
import Board from './components/Board';  
import Header from './components/Header';

function App() {
  return (
    <Router>
      {/* Wrapping the entire app in DndProvider to provide drag-and-drop context */}
      <DndProvider backend={HTML5Backend}> 
        <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/users-boards" element={<UsersBoards />} />
          <Route path="/board" element={<Board />} />
        </Routes>
      </DndProvider>
    </Router>
  );
}

export default App;
