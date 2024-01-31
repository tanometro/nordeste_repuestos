import axios from "axios";
import { TransactionInterface } from "../components/interfaces";

interface FilterParameters {
  sessionToken: string | undefined,
  dni_or_name: string | number;
  from_date?: string; 
  to_date?: string;
}

const filterByFinalCustomer = async (parameters: FilterParameters): Promise<TransactionInterface[]> => {
  
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/transaction/filterByFinalCustomer`, {
      headers: {
        Authorization: parameters.sessionToken,
      },
      params: parameters, 
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