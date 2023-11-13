import axios from "axios";

// Obtiene todos los usuarios //
const getAllTransactions = async () => {
    const storedToken = localStorage.getItem('token');
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/transaction/list`, {
        headers: {
          Authorization: storedToken, 
        },
      });
  
      if (response.status !== 200) {
        throw new Error(`Error en la solicitud: ${response.status}`);
      }
  
      const data = response.data;
  
      return data;
    } catch (error) {
      throw new Error("Error en obtener transacciones");
    }
  };

export default getAllTransactions;