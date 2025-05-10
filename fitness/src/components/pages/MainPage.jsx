import { useEffect } from "react";

const MainPage = () => {
  useEffect(() => {
    fetch("http://localhost:8000/api/diet/")
    .then((res) =>res.json()) 
    .then(data => console.log(data))
  
  },[]);


  return <h1>MainPage</h1>;
};

export default MainPage;
