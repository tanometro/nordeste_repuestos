import { BASE_URL } from "../constants";
import { UserInterface } from "../interfaces";

// Borra un usuario //
const deleteUser = async (id: number, setUsers: React.Dispatch<React.SetStateAction<UserInterface[]>>) => {
    const storedToken = localStorage.getItem('token');
    try {
      if (storedToken !== null) {
      const response = await fetch(`${BASE_URL}/user/deactivate`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json', 
          Authorization: storedToken,
        },
        body: JSON.stringify({id: id.toString()}),
      });
      if (!response.ok) {
          throw new Error('Error al eliminar el usuario' + response);
      } 
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  }  else{
          window.alert("Usuario eliminado exitosamente")
      }

  } catch (error) {
    if (error instanceof Error) {
      throw new Error("No editó el usuario: " + error.message);
    } else {
      throw new Error("Error desconocido: " + String(error));
    }
  }
  };

export default deleteUser;