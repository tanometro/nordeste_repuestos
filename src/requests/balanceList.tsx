import { BalanceListInterface } from "../components/interfaces";

const balanceList = async (sessionToken: string | undefined): Promise<BalanceListInterface[]> => {

  try {
    if (sessionToken) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/audit/balance_list`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json', 
          Authorization: sessionToken,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = '/'; 
        } else {
          throw new Error('Error de la API: ' + response);
        }
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
