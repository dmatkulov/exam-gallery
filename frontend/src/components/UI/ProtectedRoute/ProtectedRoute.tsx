import React from 'react';
import { Navigate } from 'react-router-dom';
import { routes } from '../../../utils/constants';

interface Props extends React.PropsWithChildren {
  isAllowed: boolean | null;
}

const ProtectedRoute: React.FC<Props> = ({ isAllowed, children }) => {
  if (!isAllowed) {
    return <Navigate to={routes.login} />;
  }

  return children;
};

export default ProtectedRoute;
