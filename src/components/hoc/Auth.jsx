import { Navigate } from 'react-router-dom';

export const Auth = ({ children }) => {
   const token = localStorage.getItem('token');
   if (!token) return <Navigate to={'/sign-in'} />;
   else return children;
};
