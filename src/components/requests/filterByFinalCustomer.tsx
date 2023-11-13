import axios from "axios";
import { TransactionInterface } from "../interfaces";

const filterByFinalCustomer = async (parameters: string | number): Promise<TransactionInterface[]> => {
    
    const storedToken = localStorage.getItem('token');
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/transaction/filterByFinalCustomer/?dni_or_name=${parameters}`, {
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

export default filterByFinalCustomer;