
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
      <h1 className="diets-title">Diets</h1>

      <input
        type="text"
        className="diets-search"
        // onInput={(e) => setSearchingDiet(e.target.value)}
      />

      <DietList diets={diets} setChoosedDiet={setChoosedDiet}/>
    </section>
  );
};

export default DietsPage;
