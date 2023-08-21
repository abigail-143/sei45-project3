<<<<<<< Updated upstream
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
=======
import React from "react";
import "./App.css";
import SubmitContent from "./components/submitContent/SubmitContent";
import ContentModal from "./components/contentOverlay/ContentModal";
import Headers from "./components/temp/Headers";

function App() {
  return (
    <>

<SubmitContent></SubmitContent>

>>>>>>> Stashed changes
    </>
  );
}

export default App;
<<<<<<< Updated upstream

// <Header />
// <WelcomePage />
// <Login />
// <Register />
// <ExplorePage /> >> <ExploreContentDisplay />
// <UserPage /> >> <UserContentDisplay />
// <SubmitContent />
=======
>>>>>>> Stashed changes
