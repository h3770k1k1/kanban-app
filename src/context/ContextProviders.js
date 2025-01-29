import React from 'react';
import { Route, Routes } from 'react-router-dom';
import UsersBoards from '../views/UsersBoards';
import Board from '../views/Board';
import Header from '../components/Header';
import SignIn from '../views/SignIn';
import SignUp from '../views/SignUp';
import ForgotPassword from '../views/ForgotPassword';
import DeleteAccount from '../views/DeleteAccount';
import NotFound from '../views/NotFound';
import Loading from '../views/Loading';
import ErrorBoundary from '../scripts/ErrorBoundary';
import { AuthProvider } from "./AuthContext";

const ContextProviders = () => {
  return (
    <Loading timeout={5000}>
      <AuthProvider>
      <Header />
      <ErrorBoundary>
        <Routes>
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/" element={<UsersBoards />} />
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
