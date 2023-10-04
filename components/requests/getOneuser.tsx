import { BASE_URL } from "../constants";
import axios from "axios";

const getOneUser = async (id: number) => {
    
    const storedToken = localStorage.getItem('token');
    try {
      const response = await axios.get(`${BASE_URL}/user/detail/${id}`, {
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

export default getOneUser;