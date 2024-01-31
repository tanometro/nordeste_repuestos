import axios from "axios";

const getOneUser = async (sessionToken: string | undefined, id: number) => {
 
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/detail/${id}`, {
      headers: {
        Authorization: sessionToken, 
      },
    });

    if (response.status !== 200) {
      if (response.status === 401) {
        window.location.href = '/';
      } else {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
    }

    const data = response.data;

    return data;
  } catch (error) {
    throw new Error("Error en obtener el usuario");
  }
};

export default getOneUser;
