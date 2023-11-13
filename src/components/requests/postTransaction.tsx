import { SellInterface } from "../interfaces";


const postTransaction = async (transaction: SellInterface) => {
  const storedToken = localStorage.getItem('token');

  try {
    if (storedToken !== null) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/transaction/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: storedToken,
        },
        body: JSON.stringify(transaction),
      });

      if (!response.ok) {
        const errorMessage = await response.text();

        if (response.status === 401) {
          throw new Error("No autorizado. Por favor, vuelve a iniciar sesión.");
        } else {
          throw new Error(`Error al crear la transacción: ${errorMessage}`);
        }
      }
      window.alert("Transacción creada exitosamente");
    } else {
      throw new Error("No se pudo crear la transacción: Token no disponible");
    }
  } catch (error) { 
    window.alert((error as Error).message);
  }
};

export default postTransaction;