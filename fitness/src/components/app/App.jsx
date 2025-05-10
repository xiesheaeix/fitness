import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import MainPage from "../pages/MainPage";

import Navigation from "../common/Navigation/Navigation";
import ProfilePage from "../pages/profPage";

import "./app.scss";
import Footer from "../common/Footer/Footer";

import LoginPage from "../pages/loginPage/LoginPage";
import SignUpPage from "../pages/signUpPage/SignUpPage";
import DietsPage from "../pages/DietsPage";
import SingleDietPage from "../pages/singleDietPage/SingleDietPage";
import { useState } from "react";
import ExercisesPage from "../pages/exercisesPage/ExercisesPage";

const App = () => {
  const [choosedDiet, setChoosedDiet] = useState({});
  const [userLoggedIn, setUserLoggedIn] = useState(() => {
    return !!localStorage.getItem('authToken');
  }); //if user is loggged in or not

  return (
    <BrowserRouter>
      <div className="app" style={{ backgroundColor: "#f9f5e8" }}>
        <Navigation />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/diets" element={<DietsPage setChoosedDiet={setChoosedDiet}/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/profile" element={userLoggedIn ? <ProfilePage /> : <Navigate to="/login" />} />
          <Route path="/exercises" element={<ExercisesPage />} />

          <Route path="/diets/:nameTag" element={<SingleDietPage choosedDiet={choosedDiet}/>}/>
          
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
