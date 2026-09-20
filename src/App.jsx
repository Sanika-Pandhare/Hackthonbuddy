import React from "react";
import { Routes, Route } from "react-router-dom";


import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import CreateProfile from "./pages/CreateProfile/CreateProfile";
import Dashboard from "./pages/Dashboard/Dashboard";
import Hackathon from "./pages/Hackathon/Hackathon";
import Teams from "./pages/Teams/Teams";
import AIHub from "./pages/AIHub/AIHub";
import Projects from "./pages/Projects/Projects";
import Chat from "./pages/Chat/Chat";
import Notifications from "./pages/Notifications/Notifications";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<LandingPage />}
      />

      <Route
        path="/login"
        element={<LoginPage />}
      />

      <Route
        path="/create-profile"
        element={<CreateProfile />}
      />

      <Route
        path="/dashboard"
        element={<Dashboard />}
      />

      <Route
        path="/hackathons"
        element={<Hackathon />}
      />

       <Route
    path="/teams"
    element={<Teams />}
  />
  <Route path="/ai-hub" element={<AIHub />} />
  <Route
          path="/projects"
          element={<Projects />}
        />
        <Route path="/chat" element={<Chat />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />

    </Routes>


  );
}

export default App;