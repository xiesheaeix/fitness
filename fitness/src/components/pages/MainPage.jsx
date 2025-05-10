import { useEffect } from "react";

const MainPage = () => {
  useEffect(() => {
    fetch("http:localhost:8000/api/diet/")
      .then((data) => data.json())
      .then((res) => console.log(res));
  }, []);

  return <h1>MainPage</h1>;
};

export default MainPage;
