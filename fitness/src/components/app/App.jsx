import { BrowserRouter, Route, Routes } from "react-router-dom";

import MainPage from "../pages/MainPage";
import Diets from "../pages/Diets";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/diets" element={<Diets />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
