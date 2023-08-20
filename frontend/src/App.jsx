import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import ExplorePage from "./components/ExplorePage";
import UserPage from "./components/UserPage";
import Landing from "./components/Landing";
import Login from "./components/authenticationOverlay/LoginModal";

function App() {
  // const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);
  const [showExplorePage, setShowExplorePage] = useState(true);
  const [showUserPage, setShowUserPage] = useState(false);
  // const [showSubmitContent, setShowSubmisContent] = useState(false);
  return (
    <>
      <Header
        showWelcome={showWelcome}
        showLogin={showLogin}
        setShowLogin={setShowLogin}
        showRegister={showRegister}
        setShowRegister={setShowRegister}
      ></Header>
      {showWelcome && <Landing></Landing>}
      {showLogin && <Login></Login>}
      {/* {showRegister && <Register></Register>} */}
      {showExplorePage && !showLogin && <ExplorePage></ExplorePage>}
      {/* rmb to remove `!showLogin`*/}
      {showUserPage && <UserPage></UserPage>}
      {/* {showSubmitContent && <SubmitContent></SubmitContent>} */}
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
