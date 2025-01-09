import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import { DndProvider } from 'react-dnd'; // Importujemy DndProvider
import { HTML5Backend } from 'react-dnd-html5-backend'; // Backend dla drag and drop
import Home from './components/Home';  
import UsersBoards from './components/UsersBoards';  
import Board from './components/Board';  
import Header from './components/Header';
import SignIn from './components/SignIn';

function App() {
  return (
    <Router>
      <DndProvider backend={HTML5Backend}> 
        <Header />
        <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/users-boards" element={<UsersBoards />} />
          <Route path="/board" element={<Board />} />
        </Routes>
      </DndProvider>
    </Router>
  );
}

export default App;
