
import { useEffect, useState } from 'react';

function App() {

  const [exercise, setExercise] = useState({});
  useEffect(() => {
    fetch("http://localhost:8000/api/hello/")
      .then(res => res.json())
      .then(data => console.log(data));
  }, []);


  return (
    <>

      <h1>Fitness App</h1>
      {/* <h1>{exercise.name}</h1>
      {exercise.images && exercise.images.map((imgUrl, index) => (
        <img key={index} src={`https://${imgUrl}`} alt={`Exercise ${index}`} width="300" />
      ))} */}
    </>
    
   )
}

export default App;