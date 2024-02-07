import { UserInterface } from "../types/interfaces";

const deleteUser = async (sessionToken: string | undefined, id: number, setUsers: React.Dispatch<React.SetStateAction<UserInterface[]>>) => {
  // const storedToken = localStorage.getItem('token');
  try {
    if (sessionToken) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/deactivate`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json', 
          Authorization: sessionToken,
        },
        body: JSON.stringify({ id: id.toString() }),
      });

      if (!response.ok) {
        if (!sessionToken) {
          window.location.href = '/';
        } else {
          throw new Error('Error al eliminar el usuario' + response);
        }
      }

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } else {
      window.alert("Usuario eliminado exitosamente");
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("No eliminó el usuario: " + error.message);
    } else {
      throw new Error("Error desconocido: " + String(error));
    }
  }
};

export default deleteUser;
