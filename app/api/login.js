const apiUrl = async () => {
    try {
      const response = await fetch('http://89.117.33.196:8000/auth/login');
      
      if (!response.ok) {
        throw new Error('No se pudo obtener la respuesta correcta de la API');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error al realizar la solicitud a la API:', error);
      throw error; 
    }
  };

export default apiUrl;

// export const getServerSideProps = async (context: string) =>{
//     const response = await fetch(apiUrl)
//     const users = await response.json()
//     return ({
//       props:{
//         user: users
//       }
//     })
//   }