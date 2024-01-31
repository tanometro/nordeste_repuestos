import { UserInterface } from "../components/interfaces";

const activateUser = async (sessionToken: string | undefined, id: number, setUsers: React.Dispatch<React.SetStateAction<UserInterface[]>>) => {
    try {
      if (sessionToken) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/activate`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json', 
          Authorization: sessionToken,
        },
        body: JSON.stringify({id: id.toString()}),
      });
      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = '/login?tokenExpired=true';
        } else {
          throw new Error('Error al activar el usuario' + response);
        }
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

export default activateUser;