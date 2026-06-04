import BASE_URL from "./api";

export async function login(
  email: string,
  senha: string
) {
  const response = await fetch(
    `${BASE_URL}/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        senha,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Credenciais inválidas");
  }

  return response.json();
}