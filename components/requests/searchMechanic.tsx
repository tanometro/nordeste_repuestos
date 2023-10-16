import { BASE_URL } from "../constants";
import axios from "axios";

const getOneMechanic = async (nameOrDni: string) => {
    
    const storedToken = localStorage.getItem('token');
    try {
      const response = await axios.get(`${BASE_URL}/user/search?nameOrDni=${nameOrDni}`, {
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
      throw new Error("Error en obtener usuario mecánico");
    }
  };

export default getOneMechanic;