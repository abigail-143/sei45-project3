import React, { useState, useContext, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import ExplorePage from "./components/ExplorePage";
import UserPage from "./components/UserPage";
import Landing from "./components/Landing";
import LoginModal from "./components/authenticationOverlay/LoginModal";
import RegisterModal from "./components/authenticationOverlay/RegisterModal";
import AuthContext from "./components/context/auth";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);
  const [showUserPage, setShowUserPage] = useState(false);
  const [user, setUser] = useState([]);
  const [showCreated, setShowCreated] = useState(false);
  const [contentData, setContentData] = useState([]);

  if (showWelcome) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "initial";
  }
  
  return (
    <>
      <AuthContext.Provider value={{ accessToken, setAccessToken }}>
        <Header
          showWelcome={showWelcome}
          showUserPage={showUserPage}
          setShowUserPage={setShowUserPage}
          showCreated={showCreated}
          setShowCreated={setShowCreated}
          contentData={contentData}
          setContentData={setContentData}
          user={user}
        ></Header>
        <Suspense>
          <Routes>
            <Route
              path="/"
              element={<Landing></Landing>}
            ></Route>
            <Route
              path="/login"
              element={
                <LoginModal
                  setShowWelcome={setShowWelcome}
                  setUser={setUser}
                ></LoginModal>
              }
            ></Route>
            <Route
              path="/register"
              element={
                <RegisterModal setShowWelcome={setShowWelcome}></RegisterModal>
              }
            ></Route>
            <Route
              path="/explore"
              element={
                <ExplorePage
                  contentData={contentData}
                  setContentData={setContentData}
                  user={user}
                ></ExplorePage>
              }
            ></Route>
            <Route
              path="/user"
              element={
                <UserPage
                  user={user}
                  setUser={setUser}
                  showCreated={showCreated}
                  setShowCreated={setShowCreated}
                ></UserPage>
              }
            ></Route>
          </Routes>
        </Suspense>
      </AuthContext.Provider>
    </>
  );
}

export default App;

// <Header />
// <WelcomePage />
// <Login />
// <Register />
// <ExplorePage /> >> <ExploreContentDisplay />
// <UserPage /> >> <UserContentDisplay />
// <SubmitContent />
