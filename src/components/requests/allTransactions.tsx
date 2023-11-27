import axios, { AxiosError } from "axios";

const getAllTransactions = async () => {
  const storedToken = localStorage.getItem('token');

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/transaction/list`, {
      headers: {
        Authorization: storedToken, 
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
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      if (axiosError.response?.status === 401) {
        window.location.href = '/'; 
      } else {
        throw new Error(`Error en la solicitud: ${axiosError.response?.status}`);
      }
    } else {
      throw new Error("Error desconocido al obtener transacciones");
    }
  }
};

export default getAllTransactions;
