import { UserInterface } from "../interfaces";

const activateUser = async (id: number, setUsers: React.Dispatch<React.SetStateAction<UserInterface[]>>) => {
    const storedToken = localStorage.getItem('token');
    try {
      if (storedToken !== null) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/activate`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json', 
          Authorization: storedToken,
        },
        body: JSON.stringify({id: id.toString()}),
      });
      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = '/'; 
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