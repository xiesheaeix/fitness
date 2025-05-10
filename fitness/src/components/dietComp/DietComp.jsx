// filepath: /Users/sheaehrenberger/Desktop/fitness/fitness/src/components/dietComp/DietComp.jsx
import { useEffect, useState } from "react";
import DietDetails from "../dietDetailsComp/DietDetailsComp";

const DietComp = () => {
  const [diets, setDiets] = useState([]);
  const [selectedDiet, setSelectedDiet] = useState(null); // To store the selected diet name

  useEffect(() => {
    fetch("http://localhost:8000/api/diet/")
      .then((res) => res.json())
      .then((data) => setDiets(data))
      .catch((err) => console.error("Failed to fetch diets:", err));
  }, []);

  const handleDietClick = (dietName) => {
    setSelectedDiet(dietName); // Set the selected diet name
  };

  return (
    <div>
      <h1>Diets</h1>
      {!selectedDiet ? (
        <ul>
          {diets.map((diet) => (
            <li
              key={diet.id}
              onClick={() => handleDietClick(diet.name)}
              style={{ cursor: "pointer" }}
            >
              <h3>{diet.name}</h3>
              <p>{diet.description}</p>
              {diet.image && (
                <img
                  src={`http://localhost:8000${diet.image}`}
                  alt={diet.name}
                  width="200"
                />
              )}
            </li>
          ))}
        </ul>
      ) : (
        <DietDetails dietName={selectedDiet} onBack={() => setSelectedDiet(null)} />
      )}
    </div>
  );
};

export default DietComp;