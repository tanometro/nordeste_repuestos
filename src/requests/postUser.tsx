import { UserPost } from "../components/interfaces";

const postUser = async (sessionToken: string | undefined, user: UserPost) => {
  try {
    if (sessionToken ) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: sessionToken,
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorMessage = await response.text();

        if (response.status === 401) {
          window.location.href = '/';
        } else {
          throw new Error(`Error al crear el usuario: ${errorMessage}`);
        }
      }
      return response;
    } else {
      throw new Error("No se pudo crear el usuario: Token no disponible");
    }
  } catch (error) { 
    if (error instanceof Error) {
      window.alert(error.message);
    } else {
      window.alert("Error desconocido al crear el usuario");
    }
  }
};

export default postUser;

