import { UserInterface } from "../interfaces"
 
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