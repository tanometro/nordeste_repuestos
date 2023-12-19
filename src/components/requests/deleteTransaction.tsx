import { TransactionInterface } from "../interfaces";

const deleteTransaction = async (id: number, setTransactions: React.Dispatch<React.SetStateAction<TransactionInterface[]>>) => {
  const storedToken = localStorage.getItem('token');
  try {
    if (storedToken !== null) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/transaction/cancel`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json', 
          Authorization: storedToken,
        },
        body: JSON.stringify({ id: id.toString() }),
      });

      if (!response.ok) {
        if (response.status === 401) {
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
