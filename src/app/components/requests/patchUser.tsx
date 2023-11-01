// import { BASE_URL } from "../constants"


interface User {
    roleId: number | null,
    dni: string,
    username: string,
    password: string,
    name: string,
    commission: number | null,
    isActive: boolean,
    
  } 

const patchUser = async (user: User) => {
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
            throw new Error('Error al editar el usuario');
        } 
    }  else{
            window.alert("Usuario editado exitosamente")
        }

    } catch(error){
        throw new Error ("No se pudo editar el usuario")
    }
  }

export default patchUser;