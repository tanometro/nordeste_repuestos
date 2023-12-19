import { UserInterface } from "../interfaces";

const patchUser = async (user: UserInterface) => {
  const storedToken = localStorage.getItem('token');
  try {
    if (storedToken !== null) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/update`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: storedToken,
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = '/';
        } else {
          throw new Error('Error al editar el usuario');
        }
      }
    } else {
      window.alert("Usuario editado exitosamente");
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("No se pudo editar el usuario: " + error.message);
    } else {
      throw new Error("Error desconocido al editar el usuario");
    }
  }
};

export default patchUser;
