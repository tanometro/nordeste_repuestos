import axios from "axios";
import { TransactionInterface } from "../types/interfaces";

interface FilterParameters {
  dni_or_name: string | number;
  from_date?: string; 
  to_date?: string;
}

const filterByFinalCustomer = async (sessionToken: string | undefined, parameters: FilterParameters): Promise<TransactionInterface[]> => {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/transaction/filterByFinalCustomer`, {
      headers: {
        Authorization: sessionToken,
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