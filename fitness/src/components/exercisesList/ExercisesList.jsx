import React from "react";
import "./exercisesList.scss";

const ExercisesList = ({ exercises }) => {
  return (
    <div className="exercise-list">
      {exercises.length === 0 ? (
        <p>No exercises available.</p>
      ) : (
        <div className="card-grid">
          {exercises.map((exercise, index) => (
            <div className="exercise-card" key={index}>
              <img
                src={exercise.image}
                alt={exercise.name}
                className="exercise-image"
              />
              <div className="exercise-details">
                <h3>{exercise.name}</h3>
                <p>Duration: {exercise.duration} min</p>
                <p>Calories: {+(exercise.burn_calories)} kcal</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExercisesList;
