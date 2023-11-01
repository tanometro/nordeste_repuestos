import { BASE_URL } from "../constants";

interface User {
  roleId: number | null,
  dni: string,
  username: string,
  password: string,
  name: string,
  commission: number | null,
}

const postUser = async (user: User) => {
  const storedToken = localStorage.getItem('token');
  try {
    if (storedToken !== null) {
      const response = await fetch(`${BASE_URL}/user/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: storedToken,
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorMessage = await response.text();

        if (response.status === 401) {
          throw new Error("No autorizado. Por favor, vuelve a iniciar sesión.");
        } else {
          throw new Error(`Error al crear el usuario: ${errorMessage}`);
        }
      }
      window.alert("Usuario creado exitosamente");
    } else {
      throw new Error("No se pudo crear el usuario: Token no disponible");
    }
  } catch (error) { 
    if (error as Error) {
      window.alert((error as Error).message);
    } 
  }
};

export default postUser;
