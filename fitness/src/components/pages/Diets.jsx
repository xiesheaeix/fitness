 import { useEffect, useState } from "react";

const Diets = () => {
 
  const [diets, setDiets] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/api/diet/")
      .then((res) => res.json())
      .then((data) => setDiets(data))
      .catch((err) => console.error("Failed to fetch diets:", err));
  }, []);

  return (
    <div>
      <h1>Diets</h1>
      <ul>
        {diets.map((diet) => (
          <li key={diet.id}>
            <h3>{diet.name}</h3>
            <p>{diet.description}</p>
            {diet.image && <img src={diet.image} alt={diet.name} width="200" />}
          </li>
        ))}
      </ul>
    </div>
  );
};


export default Diets;
