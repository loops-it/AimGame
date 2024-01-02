import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";


import { MainContextProvider } from "./context/MainContext";

//Pages
import Login from "./pages/Login";
import LoginWorkspace from "./pages/LoginWorkspace";
import LoginWorkspaceSelect from "./pages/LoginWorkspaceSelect";

import PasswordResetSend from "./pages/PasswordReset/PasswordResetSend";
import PasswordResetVerify from "./pages/PasswordReset/PasswordResetVerify";
import PasswordReset from "./pages/PasswordReset/PasswordReset";

import CreateWorkspacePersonal from "./pages/CreateWorkspace/CreateWorkspacePersonal";
import CreateWorkspaceOrganization from "./pages/CreateWorkspace/CreateWorkspaceOrganization";
import CreateWorkspaceInvite from "./pages/CreateWorkspace/CreateWorkspaceInvite";
import Dashboard from "./pages/Dashboard";
import Opportunities from "./pages/Opportunities";
import Clients from "./pages/Clients";
import Partners from "./pages/Partners";
import Events from "./pages/Events";
import Tasks from "./pages/Tasks";




export default function App() {
  return (
    <MainContextProvider>
      <BrowserRouter>
        <Routes >
          <Route path="/" element={<Login title={"Aimgame | Login"} />} />
          <Route path="/login/workspace" element={<LoginWorkspace title={"Aimgame | Login Workspace"} />} />
          <Route path="/login/workspace-select" element={<LoginWorkspaceSelect title={"Aimgame | Select Workspace"} />} />

          <Route path="/password-reset/send" element={<PasswordResetSend title={"Aimgame | Password Forgot"} />} />
          <Route path="/password-reset/verify" element={<PasswordResetVerify title={"Aimgame | Password Forgot Verify"} />} />
          <Route path="/password-reset" element={<PasswordReset title={"Aimgame | Password Reset"} />} />

          <Route path="/register-workspace/personal" element={<CreateWorkspacePersonal title={"Aimgame | Workspace Personal"} />} />
          <Route path="/register-workspace/organization" element={<CreateWorkspaceOrganization title={"Aimgame | Workspace Organization"} />} />
          <Route path="/register-workspace/invite" element={<CreateWorkspaceInvite title={"Aimgame | Workspace Invite"} />} />

          <Route path="/dashboard" element={<Dashboard title={"Aimgame | Dashboard"} />} />
          <Route path="/opportunities" element={<Opportunities title={"Aimgame | Opportunities"} />} />
          <Route path="/clients" element={<Clients title={"Aimgame | Clients"} />} />
          <Route path="/partners" element={<Partners title={"Aimgame | Partners"} />} />

          <Route path="/events" element={<Events title={"Aimgame | Events"} />} />

          <Route path="/tasks" element={<Tasks title={"Aimgame"} />} />


        </Routes>
      </BrowserRouter>
    </MainContextProvider>
  )
}
