import { BalanceListInterface } from "../interfaces";

const balanceList = async (): Promise<BalanceListInterface[]> => {
    const storedToken = localStorage.getItem('token');
    try {
      if (storedToken !== null) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/audit/balance_list`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json', 
            Authorization: storedToken,
          },
        });
        if (!response.ok) {
          throw new Error('Error de la api:' + response);
        }
  
        const data = await response.json();
        return data; 
  
      } else {
        window.alert("No se obtuvieron las transacciones");
        return []; 
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error(String(error));
      }
    }
  };

export default balanceList;