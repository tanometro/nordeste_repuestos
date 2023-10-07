import { BASE_URL } from "../constants";

async function logReq(userData: {username: string, password: string}) {
    const formData = new FormData();
    formData.append('username', userData.username);
    formData.append('password', userData.password);
    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST', 
        body: formData
      });
  
      if (!response.ok) {
        throw new Error('Credenciales incorrectas');
      }
      const data = await response.json();
  
      if (response.status === 200) {
        localStorage.setItem('token', data.token);
      } else {
        throw new Error('Credenciales incorrectas');
      }
    } catch (error) {
        throw new Error('Ocurrió un error desconocido');
    }
  }

export default logReq;