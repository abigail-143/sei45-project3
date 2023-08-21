import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import ExplorePage from "./components/ExplorePage";
import UserPage from "./components/UserPage";
import SubmitContent from "./components/submitContent/SubmitContent"

function App() {
  // const [showRegister, setShowRegister] = useState(false);
  // const [showLogin, setShowLogin] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showExplorePage, setShowExplorePage] = useState(false);
  const [showUserPage, setShowUserPage] = useState(true);
  const [showSubmitContent, setShowSubmisContent] = useState(false);
  return (
    <>
      <Header
        showWelcome={showWelcome}
        showExplorePage={showExplorePage}
        showUserPage={showUserPage}
        setShowExplorePage={setShowExplorePage}
        setShowUserPage={setShowUserPage}
      ></Header>
      {/* {showWelcome && <WelcomePage></WelcomePage>} */}
      {/* {showLogin && <Login></Login>} */}
      {/* {showRegister && <Register></Register>} */}
      {showExplorePage && <ExplorePage></ExplorePage>}
      {showUserPage && <UserPage></UserPage>}
      {showSubmitContent && <SubmitContent></SubmitContent>}
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
