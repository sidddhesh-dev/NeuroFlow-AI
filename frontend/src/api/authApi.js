const BASE_URL = "http://127.0.0.1:8000";


export async function registerUser(userData) {
  const response = await fetch(`${BASE_URL}/accounts/register/`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(userData),});
  const data = await response.json();

  if (!response.ok) { throw data; }

  return data;
}


export async function loginUser(credentials) {
  const response = await fetch(`${BASE_URL}/api/token/`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(credentials),
  });

  const data = await response.json();

  if (!response.ok) {
    throw data;
  }

  return data;
}