import { useEffect, useState } from "react";
import ExercisesList from "../../exercisesList/ExercisesList"; // Make sure you have this component for displaying the list
import "./exercisesPage.scss"; // Add your styles here
const ExercisesPage = () => {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  fetch("http://localhost:8000/api/exercises/")
    .then((res) => res.json())
    .then((data) => {
      setExercises(data);
      setLoading(false);
    })
    .catch((err) => {
      setError("Failed to fetch exercises.");
      setLoading(false);
      console.error("Failed to fetch exercises:", err);
    });
}, []);


  return (
    <section className="exercises">
      <div className="container">
        <h1 className="exercises-title">Exercises</h1>

      
        <ExercisesList exercises={exercises}/>
      </div>
    </section>
  );
};

export default ExercisesPage;