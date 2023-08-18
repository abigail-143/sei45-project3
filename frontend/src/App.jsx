import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";

function App() {
  // const [showRegister, setShowRegister] = useState(false);
  // const [showLogin, setShowLogin] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  // const [showLandingPage, setShowLandingPage] = useState(true);
  // const [showExplorePage, setShowExplorePage] = useState(false);
  // const [showUserPage, setShowUserPage] = useState(false);
  // const [showSubmitContent, setShowSubmisContent] = useState(false);
  return (
    <>
      <Header showWelcome={showWelcome}></Header>
      {/* {showWelcome && <WelcomePage></WelcomePage>}
      {showLogin && <Login></Login>}
      {showRegister && <Register></Register>}
      {showLandingPage && <LandingPage></LandingPage>}
      {showExplorePage && <ExplorePage></ExplorePage>}
      {showUserPage && <UserPage></UserPage>}
      {showSubmitContent && <SubmitContent></SubmitContent>} */}
    </>
  );
}

export default App;

// <Header />
// <WelcomePage />
// <LandingPage />
// <ExplorePage />
// <UserPage />
// <ExploreContentDisplay />
// <UserContentDisplay />
// <SubmitContent />
// <Register />
// <Login />
