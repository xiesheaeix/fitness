const fetchWithAuth = async (url, options = {}) => {
  let access = localStorage.getItem("access");

  // Устанавливаем Authorization заголовок
  options.headers = {
    ...options.headers,
    Authorization: `Bearer ${access}`,
  };

  let response = await fetch(url, options);

  // Если access токен истёк
  if (response.status === 401) {
    await refreshAccessToken(); // обновляем токен
    access = localStorage.getItem("access");

    // Повторяем запрос с новым access токеном
    options.headers.Authorization = `Bearer ${access}`;
    response = await fetch(url, options);
  }

  return response;
};
