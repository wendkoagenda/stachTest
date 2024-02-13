// import React from "react";
// import { Route, Navigate } from "react-router-dom";

// const PrivateRoute: React.FC<{
//   path: string;
//   element: React.ReactNode;
// }> = ({ element: Element, ...rest }) => {
//   const isAuthenticated = localStorage.getItem("isAuthenticated");

//   if (!isAuthenticated) {
//     return <Navigate to="/login" />; // Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
//   }

//   return <Route {...rest} element={Element} />;
// };

// export default PrivateRoute;

import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  return isAuthenticated === "yes" ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
