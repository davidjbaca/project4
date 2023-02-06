import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { useState } from "react";


import SignUpPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";

import userService from "./utils/userService";

export default function App() {
  const [user, setUser] = useState(userService.getUser()); // if theres a token, grab it, if not the value will be null


  function handleSignUpOrLogin() {
    setUser(userService.getUser()); // getUser, gets the jwt from localstorage and decodes it
  }

  function handleLogout() {

    console.log('being called')
    userService.logout();
    setUser(null);
  }
  if (user) {
    // are we logged in?
    return (
      <Routes>
        <Route
          path="/"
          element={
            <ProfilePage loggedUser={user} handleLogout={handleLogout} />
          }
        />
      </Routes>
    );
}

  return (
    <Routes>
      <Route
        path="/login"
        element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route
        path="/signup"
        element={<SignUpPage handleSignUpOrLogin={handleSignUpOrLogin} />}
      />
      <Route path="/*" element={<Navigate to="/login" />} />
    </Routes>
  );
}


