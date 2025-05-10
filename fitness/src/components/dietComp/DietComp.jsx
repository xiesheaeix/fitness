// filepath: /Users/sheaehrenberger/Desktop/fitness/fitness/src/components/dietComp/DietComp.jsx
import { useEffect, useState } from "react";
import DietDetails from "../dietDetailsComp/DietDetailsComp";
import "./dietComp.scss";

const DietComp = () => {
  const [diets, setDiets] = useState([]);
  const [selectedDiet, setSelectedDiet] = useState(null); // To store the selected diet name

  useEffect(() => {
    fetch("http://localhost:8000/api/diet/")
      .then((res) => res.json())
      .then((data) => setDiets(data))
      .catch((err) => console.error("Failed to fetch diets:", err));
  }, []);

  const handleDietClick = (diet) => {
    setSelectedDiet(diet); // Set the selected diet name
  };

  return (
    <div className="diet-comp">
      <h1>Diets</h1>
      {!selectedDiet ? (
        <ul>
          {diets.map((diet) => (
            <li
              key={diet.id}
              onClick={() => handleDietClick(diet)}
              style={{ cursor: "pointer" }}
            >
              <div className="text-content">
                <h3>{diet.name}</h3>
                <p>{diet.description}</p>
              </div>
          

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
        <DietDetails diet={selectedDiet} onBack={() => setSelectedDiet(null)} />
      )}
    </div>
  );
};

export default DietComp;