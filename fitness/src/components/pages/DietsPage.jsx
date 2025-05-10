
import { useEffect, useState } from "react";
import "./dietsPage.scss";
import DietList from "../dietList/DietList";

const DietsPage = ({setChoosedDiet}) => {


  const [diets, setDiets] = useState([]);
  const [searchingDiet, setSearchingDiet] = useState("");

  useEffect(() => {
    fetch("http://localhost:8000/api/diet/")
      .then((res) => res.json())
      .then((data) => setDiets(data))
      .catch((err) => console.error("Failed to fetch diets:", err));
  }, []);

  return (
    <section className="diets">
      <div className="container">
        <h1 className="diets-title">Diets</h1>

        <DietList diets={diets} setChoosedDiet={setChoosedDiet}/>
      </div>
    </section>
  );
};

export default DietsPage;
