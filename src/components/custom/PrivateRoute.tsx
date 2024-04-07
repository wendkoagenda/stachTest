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
  const access_token = localStorage.getItem(
    "__kgfwe29__97efiyfcljbf68EF79WEFAD"
  );
  const expires_in = localStorage.getItem("__OJGBXGHFKH94s__6fb99EFNvkjbv4vsv");
  const user_id = localStorage.getItem("__lybbg995__g629r49659664sfkybiyfc");
  const user_uuid = localStorage.getItem("__ubvfiwbvs6827fjyfufavc__nv24fjvk");
  const camp_yearId = localStorage.getItem(
    "__ppohwr4bvkyjfiv298fjyfufavc__nv2"
  );

  return isAuthenticated === "yes" &&
    access_token != null &&
    expires_in != null &&
    user_id != null &&
    user_uuid != null &&
    camp_yearId != null ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
