import { SellInterface } from "../components/interfaces";

const postTransaction = async (sessionToken: string | undefined, transaction: SellInterface) => {

  try {
    if (sessionToken) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/transaction/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: sessionToken,
        },
        body: JSON.stringify(transaction),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        if (response.status === 401) {
          window.location.href = '/';
        } else {
          throw new Error(`Error al crear la transacción: ${errorMessage}`);
        }
      }
      window.alert("Transacción creada exitosamente");
    } else {
      throw new Error("No se pudo crear la transacción: Token no disponible");
    }
  } catch (error) {
    if (error instanceof Error) {
      window.alert(error);
      
    } else {
      window.alert("Error desconocido al crear la transacción");
    }
  }
};

export default postTransaction;
