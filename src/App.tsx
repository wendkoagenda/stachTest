import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/custom/PrivateRoute";
import { ThemeProvider } from "./components/ui/theme-provider";
import AgentsList from "./pages/agent";
import Login from "./pages/auth/Login";
import Home from "./pages/home";
import { Toaster } from "./components/ui/toaster";
import StudentsList from "./pages/student";
import TeachersList from "./pages/teacher";
import DepartementsList from "./pages/departement/DepartementsList";
import DepartementShow from "./pages/departement/components/show/DepartementShow";
import ClasseShowMore from "./pages/classe/components/show/ClasseShowMore";
import ModulesList from "./pages/module";
import SeancesList from "./pages/seances";
import UsersList from "./pages/user";
import SettingsList from "./pages/setting";
import AllfinalclassesList from "./pages/allfinalclasse/AllfinalclassesList";
import MycoursesList from "./pages/mycourses";
import MyyearList from "./pages/myyear";
import RoleShowMore from "./pages/rolepermission/components/show/RoleShowMore";
import Myaccount from "./pages/myaccount";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route element={<Home />} path="/" />
            <Route element={<UsersList />} path="/users" />
            <Route element={<SettingsList />} path="/settings" />
            <Route element={<AgentsList />} path="/agents" />
            <Route element={<AllfinalclassesList />} path="/allfinalclasses" />
            <Route element={<StudentsList />} path="/students" />
            <Route element={<TeachersList />} path="/teachers" />
            <Route element={<DepartementsList />} path="/departements" />
            <Route element={<DepartementShow />} path="/departement/:dc_uuid" />
            <Route
              element={<ClasseShowMore />}
              path="/classe/:dcnf_uuid/:dcnf_id"
            />
            <Route element={<ModulesList />} path="/modules" />
            <Route element={<SeancesList />} path="/seances" />
            <Route element={<MycoursesList />} path="/mycourses" />
            <Route element={<MyyearList />} path="/myyear" />
            <Route element={<Myaccount />} path="/myaccount" />
            <Route element={<RoleShowMore />} path="/role/:role_uuid" />
          </Route>
          <Route element={<Login />} path="/login" />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
