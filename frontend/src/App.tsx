import './App.css'
import NavBar from "./NavBar.tsx";
import React from "react";
import DefaultPage from "./DefaultPage.tsx";
import RecommendationPage from "./RecommendationPage.tsx";
import {Toaster} from "react-hot-toast";

function App() {


  return (
      <div className="container-fluid m-0 p-0">
          <Toaster />
          <NavBar />
          <DefaultPage />
          <RecommendationPage/>
      </div>
  )
}

export default React.memo(App);
