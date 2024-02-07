import { TransactionInterface } from "../types/interfaces";

const deleteTransaction = async (sessionToken: string | undefined, id: number, setTransactions: React.Dispatch<React.SetStateAction<TransactionInterface[]>>) => {
  try {
    if (sessionToken) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/transaction/cancel`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json', 
          Authorization: sessionToken,
        },
        body: JSON.stringify({ id: id.toString() }),
      });

      if (!response.ok) {
        if (!sessionToken) {
          window.location.href = '/';
        } else {
          throw new Error('Error al eliminar la transacción' + response);
        }
      }

      setTransactions((prevTransactions) => prevTransactions.filter((transaction) => transaction.id !== id));
    } else {
      window.alert("Transacción eliminada exitosamente");
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error("No eliminó la transacción: " + error.message);
    } else {
      throw new Error("Error desconocido: " + String(error));
    }
  }
};

export default deleteTransaction;
