import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import { DndProvider } from 'react-dnd'; // Importujemy DndProvider
import { HTML5Backend } from 'react-dnd-html5-backend'; // Backend dla drag and drop
import Home from './components/Home';  
import UsersBoards from './components/UsersBoards';  
import Board from './components/Board';  
import Header from './components/Header';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ForgotPassword from './components/ForgotPassword';
import DeleteAccount from './components/DeleteAccount';
import NotFound from './components/NotFound';
import Loading from './components/Loading';
import theme, { ThemeProvider } from './styles/theme';

function App() {
  return (
    <Router>
      <DndProvider backend={HTML5Backend}> 
      <ThemeProvider theme={theme}>
        <Header />
        <Routes> 
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/users-boards" element={<UsersBoards />} />
          <Route path="/board" element={<Board />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/delete-account" element={<DeleteAccount />} />
          <Route path="/loading" element={<Loading />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </ThemeProvider>
      </DndProvider>
    </Router>
  );
}

export default App;
