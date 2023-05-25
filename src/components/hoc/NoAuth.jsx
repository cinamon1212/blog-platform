import { Navigate } from 'react-router-dom';

export const NoAuth = ({ children }) => {
   const token = localStorage.getItem('token');
   if (token) return <Navigate to={'/'} />;
   else return children;
};
