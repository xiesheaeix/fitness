import { useEffect, useState } from "react";

// Обновление access токена
const refreshAccessToken = async () => {
  const response = await fetch("http://localhost:8000/api/token/refresh/", {
    method: "POST",
    credentials: "include", // включаем куки (если refresh хранится в куки)
  });

  const data = await response.json();

  if (data.access) {
    localStorage.setItem("access", data.access);
    console.log("Access token обновлён");
    return true;
  } else {
    console.error("Не удалось обновить токен");
    return false;
  }
};

// Обёртка для fetch с автоматическим обновлением токена
const fetchWithAuth = async (url, options = {}) => {
  let access = localStorage.getItem("access");

  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${access}`,
    "Content-Type": "application/json",
  };

  let response = await fetch(url, options);

  if (response.status === 401) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      access = localStorage.getItem("access");
      options.headers.Authorization = `Bearer ${access}`;
      response = await fetch(url, options);
    }
  }

  return response;
};

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const response = await fetchWithAuth("http://localhost:8000/api/profile/");
        const data = await response.json();

        if (response.ok) {
          setUserData(data);
        } else {
          setError(data.detail || "Ошибка при получении данных профиля");
        }
      } catch (err) {
        setError("Ошибка сети или сервера");
      }
    };

    fetchProtectedData();
  }, []);

  return (
    <div className="profile">
      <h2>Профиль</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {userData ? (
        <div>
          <p>Привет, {userData.username}</p>
          <p>Возраст: {userData.age}</p>
          <p>Рост: {userData.height} см</p>
          <p>Вес: {userData.weight} кг</p>
          <p>Калорий в день: {userData.daily_calories}</p>
        </div>
      ) : (
        !error && <p>Загрузка данных...</p>
      )}
    </div>
  );
};

export default ProfilePage;
