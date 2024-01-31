import axios, { AxiosError } from "axios";

const getAllUsers = async (sessionToken: string | undefined) => {

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/user/list`, {
      headers: {
        Authorization: sessionToken, 
      },
    });

    if (response.status !== 200) {
      if (response.status === 401) {
        window.location.href = '/login?tokenExpired=true';
      } else {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
    } 

    const data = response.data;

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 401) {
        
        window.location.href = '/'; 
      } else {
        throw new Error(`Error en la solicitud: ${axiosError.response?.status}`);
      }
    } else {
      throw new Error("Error desconocido al obtener usuarios");
    }
  }
};

export default getAllUsers;