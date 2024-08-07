import './App.css'
import NavBar from "./NavBar.tsx";
import React from "react";
import DefaultPage from "./DefaultPage.tsx";
import RecommendationPage from "./RecommendationPage.tsx";

function App() {


  return (
      <div className="container-fluid m-0 p-0">
          <NavBar />
          <DefaultPage />
          <RecommendationPage/>
      </div>
  )
}

export default React.memo(App);
