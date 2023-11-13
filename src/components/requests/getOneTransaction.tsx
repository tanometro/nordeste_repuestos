import axios from "axios";

const getOneTransaction = async (id: number) => {
    
    const storedToken = localStorage.getItem('token');
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/transaction/detail/${id}`, {
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
      throw new Error("Error en obtener usuarios");
    }
  };

export default getOneTransaction;