import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
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
import { useLocation } from 'react-router-dom';

const App = () => {
  const [isLoading, setIsLoading] = useState(true); 
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 1000); 
    return () => clearTimeout(timer); 
  }, [location]); 

  if (isLoading) {
    return <Loading />; 
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/users-boards" element={<UsersBoards />} />
        <Route path="/board" element={<Board />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/delete-account" element={<DeleteAccount />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const AppWithRouter = () => (
  <Router>
    <DndProvider backend={HTML5Backend}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </DndProvider>
  </Router>
);

export default AppWithRouter;
