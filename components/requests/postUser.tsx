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
            throw new Error('Error al crear el usuario');
        } 
    }  else{
            window.alert("Usuario creado exitosamente");
        }

    } catch(error){
        throw new Error ("No se pudo crear el usuario");
    }
}

export default postUser;