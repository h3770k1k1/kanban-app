import React, { useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './Home';
import UsersBoards from './UsersBoards';
import Board from './Board';
import Header from './Header';
import SignIn from './SignIn';
import SignUp from './SignUp';
import ForgotPassword from './ForgotPassword';
import DeleteAccount from './DeleteAccount';
import NotFound from './NotFound';
import Loading from './Loading';

const ContextProviders = () => {
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation(); // Detects route changes

  useEffect(() => {
    setIsLoading(true); // Show loading spinner when route changes
    const timer = setTimeout(() => setIsLoading(false), 1000); // Hide spinner after delay
    return () => clearTimeout(timer); // Cleanup timeout on route change
  }, [location]); // Runs whenever the location changes

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

export default ContextProviders;
