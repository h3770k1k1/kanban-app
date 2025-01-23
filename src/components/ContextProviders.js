import React from 'react';
import { Route, Routes } from 'react-router-dom';
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
import ErrorBoundary from './ErrorBoundary';
import { AuthProvider } from "./AuthContext";

const ContextProviders = () => {
  return (
    <Loading timeout={5000}>
      <AuthProvider>
      <Header />
      <ErrorBoundary>
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
      </ErrorBoundary>
      </AuthProvider>
    </Loading>
  );
};

export default ContextProviders;
