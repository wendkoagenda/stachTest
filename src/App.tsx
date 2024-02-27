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

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route element={<Home />} path="/" />
            <Route element={<AgentsList />} path="/agents" />
            <Route element={<StudentsList />} path="/students" />
            <Route element={<TeachersList />} path="/teachers" />
            <Route element={<DepartementsList />} path="/departements" />
            <Route element={<DepartementShow />} path="/departement/:dc_uuid" />
          </Route>
          <Route element={<Login />} path="/login" />
        </Routes>
      </BrowserRouter>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
