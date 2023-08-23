import React, { useState, useContext } from "react";
import "./App.css";
import Header from "./components/Header";
import ExplorePage from "./components/ExplorePage";
import UserPage from "./components/UserPage";
import Landing from "./components/Landing";
import LoginModal from "./components/authenticationOverlay/LoginModal";
import RegisterModal from "./components/authenticationOverlay/RegisterModal";
import AuthContext from "./components/context/auth";

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);
  const [showExplorePage, setShowExplorePage] = useState(false);
  const [showUserPage, setShowUserPage] = useState(false);
  const [user, setUser] = useState([]);
  const [showCreated, setShowCreated] = useState(false);
  const [contentData, setContentData] = useState([]);
  // const [showSubmitContent, setShowSubmisContent] = useState(false);

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
          showLogin={showLogin}
          setShowLogin={setShowLogin}
          showRegister={showRegister}
          setShowRegister={setShowRegister}
          showUserPage={showUserPage}
          showExplorePage={showExplorePage}
          setShowExplorePage={setShowExplorePage}
          setShowUserPage={setShowUserPage}
          user={user}
          showCreated={showCreated}
          setShowCreated={setShowCreated}
          contentData={contentData}
          setContentData={setContentData}
        ></Header>
        {showWelcome && (
          <Landing
            style={{ overflow: "hidden" }}
            showLogin={showLogin}
          ></Landing>
        )}
        {showLogin && (
          <LoginModal
            setShowLogin={setShowLogin}
            setShowWelcome={setShowWelcome}
            setShowExplorePage={setShowExplorePage}
            setUser={setUser}
          ></LoginModal>
        )}
        {showRegister && (
          <RegisterModal
            setShowRegister={setShowRegister}
            setShowWelcome={setShowWelcome}
            setShowExplorePage={setShowExplorePage}
          ></RegisterModal>
        )}
        {/* {showRegister && <Register></Register>} */}
        {showExplorePage && (
          <ExplorePage
            contentData={contentData}
            setContentData={setContentData}
          ></ExplorePage>
        )}

        {showUserPage && (
          <UserPage
            user={user}
            setUser={setUser}
            showCreated={showCreated}
            setShowCreated={setShowCreated}
          ></UserPage>
        )}
        {/* {showSubmitContent && <SubmitContent></SubmitContent>} */}
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
