import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainPage from "../pages/MainPage";
import Diets from "../pages/Diets";
import Navigation from "../common/Navigation/Navigation";
const App = () => {
  return (
    <div className="app">
      <Navigation />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/diets" element={<Diets />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
